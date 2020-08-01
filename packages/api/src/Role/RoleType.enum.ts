import { registerEnumType } from '@nestjs/graphql';

export enum RoleType {
  admin = 'admin',
  user = 'user',
}

export const RolePermissionLevels: { [role in RoleType]: number } = {
  admin: 1,
  // Gives us room to add other roles if we need
  user: 10
};

registerEnumType(RoleType, {
  name: 'RoleType'
});
