import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../Role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get<string[]>(
      'roles',
      context.getHandler()
    );

    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    const { user } = req;

    const hasRole = () =>
      user.roles.some((role: Role) => roles.includes(role.name));

    const authorized = hasRole();
    if (!authorized) {
      throw new UnauthorizedException(
        "You haven't permissions to access this resource"
      );
    }

    return user && user.roles && authorized;
  }
}
