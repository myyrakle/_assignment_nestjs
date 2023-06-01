import { Injectable, Scope } from '@nestjs/common';

export interface AuthUserData {
  id: string;
  email: string;
}

export class AuthUser {
  constructor() {
    this.authorized = false;
    this.user = null;
  }

  authorized: boolean;
  user: AuthUserData | null;
}

export const AuthUserProvider = {
  provide: 'AUTH_USER',
  scope: Scope.REQUEST,
  useClass: AuthUser,
};
