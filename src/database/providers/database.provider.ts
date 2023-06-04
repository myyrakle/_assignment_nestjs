import { Sequelize } from 'sequelize-typescript';
import { User } from '../entites/User';
import { Wallet } from '../entites/Wallet';
import { WalletBalanceChange } from '../entites/WalletBalanceChange';
import { RefreshToken } from '../entites/RefreshToken';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: Number(process.env.DB_PORT) || 12345,
        username: 'postgres',
        password: process.env.DB_PASSWORD || 'q1w2e3r4',
        database: 'postgres',
      });
      sequelize.addModels([User, Wallet, WalletBalanceChange, RefreshToken]);

      if (process.env.NODE_ENV != 'production') {
        //await sequelize.sync();
      }

      return sequelize;
    },
  },
];
