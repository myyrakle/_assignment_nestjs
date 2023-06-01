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
import { TypedRoute, TypedBody, TypedQuery } from '@nestia/core';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { AuthUser } from '../auth/providers/AuthUser';
import { Roles } from '../auth/decorators/role';
import { UseAuth } from '../auth/auth.guard';
import { GetBalanceDto } from './dto/get-balance-dto';
import { WalletDto } from './dto/wallet-dto';
import { BalanceChangeListRequestDto } from './dto/balance-change-list-request-dto';
import { CreateBalanceChangeDto } from './dto/create-balance-change.dto';
import { WalletBalanceChangeDto } from './dto/wallet-balance-change-dto';

@UseAuth()
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    @Inject('AUTH_USER') private readonly authUser: AuthUser,
  ) {}

  // 지갑 생성 엔드포인트
  @Roles(['USER'])
  @TypedRoute.Post()
  async create(
    @TypedBody() createWalletDto: CreateWalletDto,
  ): Promise<WalletDto> {
    let userId = this.authUser.user?.id!;

    let wallet = await this.walletService.create(userId, createWalletDto);
    return wallet.toDto();
  }

  // 지갑 잔액 조회
  @Roles(['USER'])
  @TypedRoute.Get('/:wallet_id/balance')
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

  @TypedRoute.Post('/:wallet_id/balance-change')
  async createBalanceChange(
    @Param('wallet_id') walletId: string,
    @TypedBody() bodyParam: CreateBalanceChangeDto,
  ): Promise<WalletBalanceChangeDto> {
    const userId = this.authUser.user?.id!;

    const wallet = await this.walletService.findOneByWalletId(walletId);

    if (wallet !== null) {
      if (wallet.ownerId === userId) {
        const balanceChange = await this.walletService.createBalanceChange(
          walletId,
          bodyParam,
        );
        return balanceChange.toDto();
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  @TypedRoute.Get('/:wallet_id/balance-change')
  async getBalanceChangeList(
    @Param('wallet_id') walletId: string,
    @TypedQuery() queryParam: BalanceChangeListRequestDto,
  ) {
    const { rows, count } = await this.walletService.findChangeListByWalletId(
      walletId,
      queryParam,
    );

    return {
      rows: rows.map((row) => row.toDto()),
      count,
    };
  }
}
