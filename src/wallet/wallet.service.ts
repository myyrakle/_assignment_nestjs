import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../database/entites/Wallet';
import { BalanceChangeListRequestDto } from './dto/balance-change-list-request-dto';
import { makePaginationOffset } from '../utils/offset';
import { WalletBalanceChange } from '../database/entites/WalletBalanceChange';

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

  async findChangeListByWalletId(
    walletId: string,
    queryParam: BalanceChangeListRequestDto,
  ) {
    const offset = makePaginationOffset(queryParam.page, queryParam.limit);

    const filter: any = {};

    if (queryParam.status) {
      filter.status = queryParam.status;
    }

    const { rows, count } = await WalletBalanceChange.findAndCountAll({
      where: { walletId, ...filter },
      limit: queryParam.limit,
      offset,
    });

    return {
      rows,
      count,
    };
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
