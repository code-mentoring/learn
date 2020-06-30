import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User } from '../User/User.entity';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { UserModule } from './UserModule.entity';
import { UserModuleService } from './UserModule.service';
import { PathUserService } from '../PathUser/PathUser.service';

@Resolver(() => UserModule)
export class UserModuleResolver {
  constructor(
    private readonly userModuleService: UserModuleService,
    private readonly pathUserService: PathUserService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Mutation(() => UserModule)
  async completeModule(
    @CurrentUser() user: User,
    @Args('moduleId') moduleId: string
  ) {
    try {
      await this.userModuleService.create(user.id, moduleId);
    } catch (e) {
      throw new Error('User has already completed that module');
    }
    const um = (await this.userModuleService.findOne(user.id, moduleId))!;

    // TODO: Refactor all this to an inner join as it's very inefficient

    // when user module complete, update user path progress
    const userModules = await this.userModuleService.findByUser(user.id);

    const numCompletedModule = userModules?.filter(
      _um => _um.module.pathId === um.module.pathId
    ).filter(upm => upm.completedAt).length;

    this.pathUserService.updatePathUserProgress(
      user.id,
      um.module.pathId,
      (numCompletedModule === undefined) ? 0 : numCompletedModule
    );

    return um;
  }
}
