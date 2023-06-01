import { SetMetadata } from '@nestjs/common';
export type UserRole = 'ADMIN' | 'USER';

export const Roles = (roles: UserRole[]) => SetMetadata('roles', roles);
