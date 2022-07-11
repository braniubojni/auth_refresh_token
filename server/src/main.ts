import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT || 6000;
  app.use(cookieParser);
  app.setGlobalPrefix('/api');

  await app.listen(PORT, () => console.log(`Server at ${PORT}`));
}
bootstrap();
