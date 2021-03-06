import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 6000;
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.use(cookieParser()); // Need 2 call parser
  app.setGlobalPrefix('/api');

  await app.listen(PORT, () => console.log(`Server at ${PORT}`));
}
bootstrap();
