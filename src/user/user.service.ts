import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { generateRandomSalt } from '../utils/salt';
import { passwordHashing } from '../utils/hashing';
import { User } from '../database/entites/User';

@Injectable()
export class UserService {
  constructor(
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const salt = generateRandomSalt();
    const hashedPassword = passwordHashing(password + salt);

    await User.create({
      email,
      password: hashedPassword,
      passwordSalt: salt,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
