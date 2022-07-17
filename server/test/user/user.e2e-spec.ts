import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { MailModule } from '../../src/mail/mail.module';
import { UserModule } from '../../src/user/user.module';

describe('[Feature] User - /user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        MailModule,
        MongooseModule.forRoot(process.env.TEST_DB_URL),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //   it.todo('Registration [POST /]');
  // it.todo('Get all [GET /]');
  // it.todo('Get one [GET /:id]');
  // it.todo('Update one [PATCH /:id]');
  // it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
