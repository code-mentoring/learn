import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import decode from 'jwt-decode';

import { User } from './User.entity';

export const CurrentUser = createParamDecorator((_data, context) => {
  const ctx = GqlExecutionContext.create(context);
  const authHeader = ctx.getContext().req.headers.authorization;
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  const { user }: { user: User } = decode(token);
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
});
