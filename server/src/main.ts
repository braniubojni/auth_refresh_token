import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true, // will transform the data into a plain object
  //     forbidNonWhitelisted: true, // will not accept any non-whitelisted params
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   }),
  // );

  const PORT = process.env.PORT || 6000;
  app.use(cookieParser()); // Need 2 call parser
  app.setGlobalPrefix('/api');

  await app.listen(PORT, () => console.log(`Server at ${PORT}`));
}
bootstrap();
