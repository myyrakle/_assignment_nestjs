import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { databaseProviders } from './providers/database.provider';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
