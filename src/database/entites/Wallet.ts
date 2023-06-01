import { literal } from 'sequelize';
import { Model, Table, Column, DataType, Comment } from 'sequelize-typescript';
import { WalletDto } from '../../wallet/dto/wallet-dto';

@Table({
  tableName: 'wallet',
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
  schema: 'public',
})
export class Wallet extends Model {
  @Comment(`기본키`)
  @Column({
    primaryKey: true,
    field: 'id',
    type: DataType.UUID,
    allowNull: false,
    defaultValue: literal('gen_random_uuid()'),
  })
  id?: string;

  @Comment(`소유자`)
  @Column({
    field: 'owner_id',
    type: DataType.UUID,
    allowNull: false,
  })
  ownerId!: string;

  @Comment(`잔액`)
  @Column({
    field: 'balance',
    type: 'numeric',
    allowNull: false,
  })
  balance!: string;

  toDto(): WalletDto {
    return {
      id: this.id!,
      ownerId: this.ownerId,
      balance: this.balance,
    };
  }
}
