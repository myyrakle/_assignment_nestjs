import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TypedBody, TypedRoute } from '@nestia/core';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post('/signup')
  async create(@TypedBody() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
