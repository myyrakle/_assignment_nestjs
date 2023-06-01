import {
  BalanceChangeStatus,
  BalanceChangeType,
} from '../../database/entites/WalletBalanceChange';

export interface WalletBalanceChangeDto {
  id: string;
  walletId: string;
  changeType: BalanceChangeType;
  beforeBalance: string;
  afterBalance: string;
  changeAmount: string;
  transactionHash: string;
  withdrawAccount: string | null;
  depositAccount: string | null;
  status: BalanceChangeStatus;
}
