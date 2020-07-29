import { SetMetadata } from '@nestjs/common';

export const RolArray = (...roles: string[]) => SetMetadata('roles', roles);
