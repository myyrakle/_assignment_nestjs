import { BalanceChangeStatus } from '../../database/entites/WalletBalanceChange';

export interface BalanceChangeListRequestDto {
  page: number;
  limit: number;
  status: BalanceChangeStatus | undefined;
}
