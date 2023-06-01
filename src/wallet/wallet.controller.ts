import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TypedRoute, TypedBody } from '@nestia/core';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../database/entites/Wallet';
import { AuthUser } from '../auth/providers/AuthUser';
import { Roles } from '../auth/decorators/role';
import { UseAuth } from '../auth/auth.guard';
import { GetBalanceDto } from './dto/get-balance-dto';

@UseAuth()
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    @Inject('AUTH_USER') private readonly authUser: AuthUser,
  ) {}

  // 지갑 생성 엔드포인트
  @Roles(['USER'])
  @Post() // no problem
  async create(@TypedBody() createWalletDto: CreateWalletDto): Promise<Wallet> {
    let userId = this.authUser.user?.id!;

    return await this.walletService.create(userId, createWalletDto);
  }

  // 지갑 잔액 조회
  @Roles(['USER'])
  @Get('/:wallet_id/balance')
  async getBalance(
    @Param('wallet_id') walletId: string,
  ): Promise<GetBalanceDto> {
    const userId = this.authUser.user?.id!;

    const wallet = await this.walletService.findOneByWalletId(walletId);

    if (wallet !== null) {
      if (wallet.ownerId === userId) {
        return {
          balance: wallet.balance,
        };
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  @TypedRoute.Get()
  findAll() {
    return this.walletService.findAll();
  }
}
