import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TypedRoute, TypedBody } from '@nestia/core';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../database/entites/Wallet';
import { AuthUser } from '../auth/providers/AuthUser';
import { Roles } from '../auth/decorators/role';

@UseGuards()
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    @Inject('AUTH_USER') private readonly authUser: AuthUser,
  ) {}

  @Roles(['USER'])
  @TypedRoute.Post() // 이 부분
  async create(@TypedBody() createWalletDto: CreateWalletDto): Promise<Wallet> {
    return await this.walletService.create(
      this.authUser.user?.id ?? '0',
      createWalletDto,
    );
  }

  @TypedRoute.Get()
  findAll() {
    return this.walletService.findAll();
  }
}
