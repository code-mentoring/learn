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
    const updatedUserModule = await this.userModuleService.update(user.id, moduleId, new Date());

    if (!updatedUserModule) throw new Error('No module updated');

    // when user module complete, update user path progress
    const userModules = await this.userModuleService.findByUser(user.id);

    const numCompletedModule = userModules?.filter(
      um => um.module.pathId === updatedUserModule.module.pathId
    ).filter(upm => upm.completedAt).length;

    this.pathUserService.updatePathUserProgress(
      user.id,
      updatedUserModule.module.pathId,
      (numCompletedModule === undefined) ? 0 : numCompletedModule
    );

    return updatedUserModule;
  }
}
