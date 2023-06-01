import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [DatabaseModule],
})
export class AuthModule {}