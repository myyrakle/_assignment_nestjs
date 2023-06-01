import { literal } from 'sequelize';
import { Model, Table, Column, DataType, Comment } from 'sequelize-typescript';

@Table({
  tableName: 'wallet_balance_change',
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
  schema: 'public',
})
export class WalletBalanceChange extends Model {
  @Comment(``)
  @Column({
    primaryKey: true,
    field: 'id',
    type: DataType.UUID,
    allowNull: false,
  })
  id?: string;

  @Comment(``)
  @Column({
    field: 'wallet_id',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: literal('gen_random_uuid()'),
  })
  walletId!: string;

  @Comment(``)
  @Column({
    field: 'change_type',
    type: DataType.STRING,
    allowNull: false,
  })
  changeType!: string;

  @Comment(``)
  @Column({
    field: 'before_balance',
    type: 'numeric',
    allowNull: false,
  })
  beforeBalance!: string;

  @Comment(``)
  @Column({
    field: 'after_balance',
    type: 'numeric',
    allowNull: false,
  })
  afterBalance!: string;

  @Comment(``)
  @Column({
    field: 'change_amount',
    type: 'numeric',
    allowNull: false,
  })
  changeAmount!: string;

  @Comment(``)
  @Column({
    field: 'transaction_hash',
    type: DataType.STRING,
    allowNull: false,
  })
  transactionHash!: string;

  @Comment(``)
  @Column({
    field: 'withdraw_account',
    type: DataType.STRING,
    allowNull: true,
  })
  withdrawAccount!: string;

  @Comment(``)
  @Column({
    field: 'deposit_account',
    type: DataType.STRING,
    allowNull: true,
  })
  depositAccount!: string;

  @Comment(``)
  @Column({
    field: 'status',
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;
}
