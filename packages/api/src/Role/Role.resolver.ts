import { UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from './Role.service';
import { Roles, RoleInput } from './Role.entity';

import { RoleValidationPipe } from './pipe/Role-validation.pipe';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => Roles)
export class RoleResolver {
  constructor(private readonly _roleService: RoleService) {}

  @Query(() => String)
  sayHello() {
    return "let's start";
  }

  @Query(() => Roles)
  searchRoles(@Args('roleId') roleId: string) {
    return this._roleService.findById(roleId);
  }

  @Query(() => [Roles])
  findAll() {
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
  updateRole(@Args('role') roleId: string, role: RoleInput) {
    return this._roleService.update(roleId, role);
  }

  @Mutation(() => Boolean)
  deleteRole(@Args('roleId') roleId: string) {
    return this._roleService.delete(roleId);
  }
}
