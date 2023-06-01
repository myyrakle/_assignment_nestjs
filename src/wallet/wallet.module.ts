import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { AuthUserProvider } from '../auth/providers/AuthUser';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WalletController],
  providers: [WalletService, UserService, AuthService, AuthUserProvider],
})
export class WalletModule {}
