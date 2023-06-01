import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from '../database/entites/Wallet';
import { BalanceChangeListRequestDto } from './dto/balance-change-list-request-dto';
import { makePaginationOffset } from '../utils/offset';
import { WalletBalanceChange } from '../database/entites/WalletBalanceChange';
import { CreateBalanceChangeDto } from './dto/create-balance-change.dto';
import { Decimal } from 'decimal.js';
import { ProcessBalanceChangeRequestDto } from './dto/process-balance-change-request.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletService {
  async create(userId: string, createWalletDto: CreateWalletDto) {
    return await Wallet.create({
      balance: createWalletDto.balance,
      ownerId: userId,
    });
  }

  async createBalanceChange(
    walletId: string,
    bodyParam: CreateBalanceChangeDto,
  ) {
    let amount = new Decimal(bodyParam.amount);

    switch (bodyParam.changeType) {
      case 'WITHDRAW':
        amount = amount.negated();
        break;
      case 'DEPOSIT':
        break;
    }

    const wallet = await this.findOneByWalletId(walletId);
    const beforeBalance = new Decimal(wallet?.balance!);
    const afterBalance = beforeBalance.plus(amount);

    return await WalletBalanceChange.create({
      walletId,
      changeType: bodyParam.changeType,
      changeAmount: bodyParam.amount,
      beforeBalance: beforeBalance.toString(),
      afterBalance: afterBalance.toString(),
      transactionHash: '??',
      withdrawAccount: null,
      depositAccount: null,
      status: 'IN_PROGRESS',
    });
  }

  async processBalanceChange(
    transaction: Transaction,
    wallet: Wallet,
    walletBalanceChange: WalletBalanceChange,
  ) {
    let amount = new Decimal(walletBalanceChange.changeAmount);

    switch (walletBalanceChange.changeType) {
      case 'WITHDRAW':
        amount = amount.negated();
        break;
      case 'DEPOSIT':
        break;
    }

    const beforeBalance = new Decimal(wallet?.balance!);
    const afterBalance = beforeBalance.plus(amount);

    await Wallet.update(
      { afterBalance: afterBalance.toString() },
      { where: { id: wallet.id }, transaction },
    );

    return await WalletBalanceChange.update(
      {
        beforeBalance: beforeBalance.toString(),
        afterBalance: afterBalance.toString(),
        status: 'DONE',
      },
      {
        where: {
          id: walletBalanceChange.id,
        },
        transaction,
      },
    );
  }

  async findOneByWalletId(walletId: string) {
    return await Wallet.findOne({
      where: { id: walletId },
    });
  }

  async findBalanceChangeById(id: string) {
    return await WalletBalanceChange.findOne({ where: { id } });
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
