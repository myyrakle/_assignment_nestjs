import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WalletModule } from '../wallet/wallet.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from './user.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { REQUEST } from '@nestjs/core';
import { Request } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WalletModule, DatabaseModule, UserModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
