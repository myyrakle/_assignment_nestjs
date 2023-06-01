import { BalanceChangeType } from '../../database/entites/WalletBalanceChange';

export interface CreateBalanceChangeDto {
  changeType: BalanceChangeType;
  amount: string;
}
