import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { UserWithPassword } from '../User/User.entity';
import { RolePermissionLevels, RoleType } from './RoleType.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) { }

  /**
   * Looks up user's role, and if any is supplied to `@Role(...)` then compare it
   */
  canActivate(context: ExecutionContext): boolean {
    // Get the roles passed in from the decorator (array of RoleType)
    const roles = this._reflector.get<(keyof typeof RoleType)[]>(
      'roles', context.getHandler());

    // If no roles supplied, allow anyone
    if (!roles.length) return true;
    // Map the roles to their numbers, and find the HIGHEST number
    const permLevels = roles.map(r => RolePermissionLevels[r]);
    const highestAllowed = Math.max(...permLevels);

    // Get the users permmission level
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    const userLevel = RolePermissionLevels[(user as UserWithPassword).role];

    // If user's level is too high, block them
    if (userLevel > highestAllowed) {
      throw new UnauthorizedException(
        "You haven't permissions to access this resource"
      );
    }

    return true;
  }
}

/**
 * Protect a query or mutation by specific roles. Also implemments GQLAuthGuard
 * @param roles List of RoleType's to auth a query/mutation/etc
 */
export const Roles = (...roles: (keyof typeof RoleType)[]) => applyDecorators(
  SetMetadata('roles', roles),
  UseGuards(GQLAuthGuard, RoleGuard)
);
