import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TypedBody, TypedRoute } from '@nestia/core';
import { UseAuth } from '../auth/auth.guard';
import { REQUEST } from '@nestjs/core';
import { AuthUser } from '../auth/providers/AuthUser';
import { Roles } from '../auth/decorators/role';
import { Request } from 'express';

@UseAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('AUTH_USER') private readonly authUser: AuthUser,
  ) {}

  /**
   * signup api
   *
   * @tag user
   */
  @TypedRoute.Post('/signup')
  async create(@TypedBody() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /**
   * get my info api
   *
   * @tag user
   */
  @Roles(['USER'])
  @TypedRoute.Get('/my-info')
  async getMyInfo(): Promise<AuthUser> {
    return this.authUser;
  }
}
