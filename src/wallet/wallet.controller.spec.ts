import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthUserProvider } from '../auth/providers/AuthUser';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [WalletController],
      providers: [WalletService, UserService, AuthService, AuthUserProvider],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
