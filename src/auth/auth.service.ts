import { Inject, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Sequelize } from 'sequelize-typescript';
import { RefreshToken } from '../database/entites/RefreshToken';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}

  private secretKey: string = process.env.JWT_SECRET_KEY ?? 'asdf';
  private accessTokenExpire: string = '1h';

  generateAccessToken(value: any) {
    const keyValue = this.secretKey;
    return jwt.sign(value, keyValue, { expiresIn: this.accessTokenExpire });
  }

  async makeRefreshToken(userId: string) {
    const token = crypto.randomBytes(20).toString('hex');

    await RefreshToken.create({
      token,
      expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      userId,
    });

    return token;
  }

  verifyAccessToken(accessToken: string) {
    const keyValue = this.secretKey;
    return jwt.verify(accessToken, keyValue);
  }
}
