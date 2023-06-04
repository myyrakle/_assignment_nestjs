import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { DatabaseModule } from '../database/database.module';
import { WalletController } from './wallet.controller';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthUserProvider } from '../auth/providers/AuthUser';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [WalletController],
      providers: [WalletService, UserService, AuthService, AuthUserProvider],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
