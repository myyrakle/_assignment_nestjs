import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthUserProvider } from '../auth/providers/AuthUser';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, AuthUserProvider],
  exports: [UserService],
  imports: [DatabaseModule],
})
export class UserModule {}
