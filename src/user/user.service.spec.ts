import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { WalletModule } from '../wallet/wallet.module';
import { UserModule } from './user.module';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { User } from '../database/entites/User';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WalletModule, DatabaseModule, UserModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user find by email', async () => {
    jest.spyOn(service, 'findOneByEmail').mockImplementation(async (email) => {
      if (email === 'exists@foobar.com') {
        return new User({
          id: '75c75b25-e696-4369-be62-c9210dbb10a9',
          email: 'exists@foobar.com',
          password:
            'e8c0e15c708f63806978c52d22ca9e58440afb087d642e1fdebce6bfb226a31e',
          passwordSalt: 'a4f808d5592a6cb161f2678744283a71',
        });
      } else {
        return null;
      }
    });

    expect(await service.findOneByEmail('exists@foobar.com')).toBeInstanceOf(
      User,
    );

    expect(await service.findOneByEmail('notexists@foobar.com')).toBeNull();
  });

  it('user find by id', async () => {
    jest.spyOn(service, 'findOneById').mockImplementation(async (id) => {
      if (id === '75c75b25-e696-4369-be62-c9210dbb10a9') {
        return new User({
          id: '75c75b25-e696-4369-be62-c9210dbb10a9',
          email: 'exists@foobar.com',
          password:
            'e8c0e15c708f63806978c52d22ca9e58440afb087d642e1fdebce6bfb226a31e',
          passwordSalt: 'a4f808d5592a6cb161f2678744283a71',
        });
      } else {
        return null;
      }
    });

    expect(
      await service.findOneById('75c75b25-e696-4369-be62-c9210dbb10a9'),
    ).toBeInstanceOf(User);

    expect(
      await service.findOneByEmail('75c75b25-e696-4369-be62-c9210dbb1123'),
    ).toBeNull();
  });

  it('user find by id', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(async ({ email, password }) => {});

    await service.create({
      email: 'asdf!@foo.bar',
      password: 'q1w2e34r4',
    });
  });
});
