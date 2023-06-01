import { Model, Table, Column, DataType, Comment } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  paranoid: false,
  freezeTableName: true,
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
  schema: 'public',
})
export class User extends Model {
  @Comment(`기본키`)
  @Column({
    primaryKey: true,
    field: 'id',
    type: DataType.UUID,
    allowNull: false,
  })
  id!: string;

  @Comment(`이메일`)
  @Column({
    field: 'email',
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Comment(`패스워드`)
  @Column({
    field: 'password',
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
