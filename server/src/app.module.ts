import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DB_URL || 'mongodb://localhost:27017/test_db',
    ),
    MailerModule.forRootAsync(),
    UserModule,
    TokenModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
