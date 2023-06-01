import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypedRoute, TypedBody } from '@nestia/core';
import { LoginResponseDto } from './dto/LoginResponseDto';
import { LoginRequestDto } from './dto/LoginRequestDto';
import { UserService } from '../user/user.service';
import { passwordHashing } from '../utils/hashing';
import { RefreshRequestDto } from './dto/RefreshRequestDto';
import { LogoutResponseDto } from './dto/LogoutResponseDto';
import { LogoutRequestDto } from './dto/LogoutRequestDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * login api
   *
   * @tag auth
   */
  @TypedRoute.Post('login')
  async login(@TypedBody() body: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByEmail(body.email);

    if (user !== null) {
      let inputPassword = passwordHashing(body.password + user.passwordSalt);

      console.log(inputPassword, user.password);
      if (inputPassword === user.password) {
        const accessToken = this.authService.generateAccessToken({
          userId: user.id,
        });
        const refreshToken = await this.authService.makeRefreshToken(user.id!);

        return {
          success: true,
          accessToken,
          refreshToken,
        };
      } else {
        return {
          success: false,
        };
      }
    } else {
      return {
        success: false,
      };
    }
  }

  /**
   * refresh api
   *
   * @tag auth
   */
  @TypedRoute.Post('refresh')
  async refresh(
    @TypedBody() body: RefreshRequestDto,
  ): Promise<LoginResponseDto> {
    const refreshToken = await this.authService.findRefreshToken(
      body.refreshToken,
    );

    if (refreshToken !== null) {
      const user = await this.userService.findOneById(refreshToken.userId);

      if (user !== null) {
        const accessToken = this.authService.generateAccessToken({
          userId: user.id,
        });
        const refreshToken = body.refreshToken;

        return {
          success: true,
          accessToken,
          refreshToken,
        };
      } else {
        return {
          success: false,
        };
      }
    } else {
      return {
        success: false,
      };
    }
  }

  /**
   * logout api
   *
   * @tag auth
   */
  @TypedRoute.Post('logout')
  async logout(
    @TypedBody() body: LogoutRequestDto,
  ): Promise<LogoutResponseDto> {
    const refreshToken = await this.authService.findRefreshToken(
      body.refreshToken,
    );

    if (refreshToken !== null) {
      return {};
    } else {
      return {};
    }
  }
}
