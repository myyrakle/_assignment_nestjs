import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../database/entites/Wallet';

@Injectable()
export class WalletService {
  async create(userId: string, createWalletDto: CreateWalletDto) {
    return await Wallet.create({
      balance: createWalletDto.balance,
      ownerId: userId,
    });
  }

  async findOneByWalletId(walletId: string) {
    return await Wallet.findOne({
      where: { id: walletId },
    });
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
