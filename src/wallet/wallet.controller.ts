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
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TypedRoute, TypedBody } from '@nestia/core';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../database/entites/Wallet';
import { AuthUser } from '../auth/providers/AuthUser';
import { Roles } from '../auth/decorators/role';
import { UseAuth } from '../auth/auth.guard';

@UseAuth()
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    @Inject('AUTH_USER') private readonly authUser: AuthUser,
  ) {}

  @Roles(['USER'])
  @Post() // no problem
  async create(@TypedBody() createWalletDto: CreateWalletDto): Promise<Wallet> {
    let userId = this.authUser.user?.id;

    if (userId != null) {
      return await this.walletService.create(userId, createWalletDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @TypedRoute.Get()
  findAll() {
    return this.walletService.findAll();
  }
}
