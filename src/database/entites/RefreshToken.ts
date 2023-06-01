import { literal } from 'sequelize';
import { Model, Table, Column, DataType, Comment } from 'sequelize-typescript';

@Table({
  tableName: 'refresh_token',
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
  schema: 'public',
})
export class RefreshToken extends Model {
  @Comment(`기본키`)
  @Column({
    primaryKey: true,
    field: 'token',
    type: DataType.STRING,
    allowNull: false,
  })
  token!: string;

  @Comment(`소유자`)
  @Column({
    field: 'user_id',
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Comment(`만료일`)
  @Column({
    field: 'expired_at',
    type: 'timestamp',
    allowNull: false,
  })
  expiredAt!: Date;
}
