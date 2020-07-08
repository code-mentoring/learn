import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { PathService } from '../Path/Path.service';
import { PathUserService } from '../PathUser/PathUser.service';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { UserModule } from './UserModule.entity';
import { UserModuleService } from './UserModule.service';

@Resolver(() => UserModule)
export class UserModuleResolver {
  constructor(
    private readonly userModuleService: UserModuleService,
    private readonly pathUserService: PathUserService,
    private readonly pathService: PathService,
    private readonly cms: CMS
  ) {}

  @UseGuards(GQLAuthGuard)
  @Mutation(() => UserModule)
  async completeModule(
    @CurrentUser() user: User,
    @Args('moduleName') moduleName: string
  ) {
    const completed = this.cms.findModuleByName(moduleName);
    if (!completed) throw new NotFoundException(`No module with name '${moduleName}'`);
    const path = await this.pathService.findByName(completed.pathId);

    const um = await this.userModuleService.create(user.id, moduleName);
    const totalModulesInPath = this.cms.findModulesByPathId(path.id).length;
    const totalCompleted = await this.userModuleService.countCompleted(user.id, completed.pathId);

    this.pathUserService.updatePathUserProgress(
      user.id,
      path.id,
      totalCompleted / totalModulesInPath
    );


    return um;
  }
}
