import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { RoleService } from './Role.service';
import { Roles, RoleInput, RoleUpdateInput } from './Role.entity';
import { RolArray } from './decorator/Role.decorator';

import { RoleValidationPipe } from './pipe/Role-validation.pipe';
import { RoleType } from './RoleType.enum';
import { RoleGuard } from './guards/Role.guard';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';

@RolArray(RoleType.ADMIN)
@UseGuards(GQLAuthGuard, RoleGuard)
@Resolver(() => Roles)
export class RoleResolver {
  constructor(private readonly _roleService: RoleService) {}

  @Query(() => Roles)
  searchRoleById(@Args('roleId') roleId: string) {
    return this._roleService.findById(roleId);
  }

  @Query(() => [Roles])
  findRoles() {
    return this._roleService.findAll();
  }

  @Mutation(() => Roles)
  @UsePipes(ValidationPipe)
  @UsePipes(RoleValidationPipe)
  createRole(@Args('role') role: RoleInput) {
    return this._roleService.create(role);
  }

  @Mutation(() => Roles)
  @UsePipes(ValidationPipe)
  updateRole(@Args('role') role: RoleUpdateInput) {
    return this._roleService.update(role);
  }

  @Mutation(() => Boolean)
  deleteRole(@Args('roleId') roleId: string) {
    return this._roleService.delete(roleId);
  }
}
