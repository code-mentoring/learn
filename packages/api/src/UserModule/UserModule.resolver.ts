import { UseGuards, NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User } from '../User/User.entity';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { UserModule } from './UserModule.entity';
import { UserModuleService } from './UserModule.service';

@Resolver(() => UserModule)
export class UserModuleResolver {
  constructor(
    private readonly userModuleService: UserModuleService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserModule])
  async myPathModules(
    @CurrentUser() user: User,
    @Args('pathId') pathId: string
  ) {
    const userModules = await this.userModuleService.findByUser(user.id);
    if (!userModules) throw new NotFoundException('UserModule not found');
    return Promise.all(userModules.filter(um => um.module.pathId === pathId));
  }
}
