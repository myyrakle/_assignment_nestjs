import { AuthUser } from './auth/providers/AuthUser';

declare global {
  namespace Express {
    interface Request {
      authUser: AuthUser;
    }
  }
}
