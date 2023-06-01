import { BalanceChangeStatus } from '../../database/entites/WalletBalanceChange';

export interface BalanceChangeListItem {
  id: string;
  walletId: string;
  changeType: string;
  beforeBalance: string;
  afterBalance: string;
  changeAmount: string;
  transactionHash: string;
  withdrawalAccount: string | null;
  depositAccount: string | null;
  status: BalanceChangeStatus;
}

export interface BalanceChangeListResponseDto {
  count: number;
  rows: BalanceChangeListItem[];
}
