import { Sequelize } from 'sequelize-typescript';

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
      sequelize.addModels([]);

      if (process.env.NODE_ENV === 'development') {
        await sequelize.sync();
      }

      return sequelize;
    },
  },
];
