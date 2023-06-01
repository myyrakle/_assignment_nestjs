import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { Reflector, REQUEST } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthUser, AuthUserData } from './providers/AuthUser';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UserService,
    private authService: AuthService,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    @Inject('AUTH_USER') private authUser: AuthUser,
  ) {}

  async canActivate(context: ExecutionContext) {
    let auth = true;
    let userType = '';

    try {
      console.log('## 인증 가드 시작 >>>>');

      const request = context.switchToHttp().getRequest();

      // 핸들러단위 Role 목록
      const handlerRoles =
        this.reflector.get<string[]>('roles', context.getHandler()) || [];

      // 컨트롤러단위 Role 목록
      const controllerRoles =
        this.reflector.get<string[]>('roles', context.getClass()) || [];

      const url = request.url;
      const method = request.method;
      const headers = request.headers;
      const params = request.params;
      const query = request.query;
      const body = request.body;
      const cookies = request.cookies;

      const accessToken = headers.authorization?.replace('Bearer ', '');

      if (accessToken && accessToken !== '') {
        console.log('## Access Token: ', accessToken);

        try {
          const decoded = this.authService.verifyAccessToken(accessToken);
          const userId = decoded?.userId;
          const user = await this.userService.findOneById(userId);

          if (user !== null) {
            const userData: AuthUserData = {
              id: user?.id!,
              email: user?.email,
            };
            request.authUser = userData;
            this.authUser.authorized = true;
            this.authUser.user = userData;

            userType = 'USER';

            console.log(`## 인증 성공: ${JSON.stringify(this.authUser.user)}`);
          } else {
            this.authUser = new AuthUser();
            this.authUser.authorized = false;
            this.authUser.user = null;

            console.log('## 인증 실패: 사용자 없음');
          }
        } catch (error) {
          console.error(error);
        }
      }

      // 해당 API에게 지정된 role이 있다면 권한 검증
      if (handlerRoles.length !== 0 || controllerRoles.length !== 0) {
        const user = this.authUser?.user;

        switch (userType) {
          //일반회원
          case 'USER':
            {
              if (
                handlerRoles.includes('USER') ||
                controllerRoles.includes('USER')
              ) {
                auth = userType === 'USER';
              }
            }
            break;
          default:
            console.log('!! 유효하지 않은 userType');
            auth = false;
        }
      }

      console.log('## 인증 가드 종료 <<<<');
      return auth;
    } catch (error) {
      console.error(error);
      auth = false;

      return auth;
    } finally {
    }
  }
}

export const UseAuth = () => UseGuards(AuthGuard);
