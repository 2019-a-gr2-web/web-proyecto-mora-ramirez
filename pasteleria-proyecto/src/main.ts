import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.set('ejs');
  await app.listen(3000);
}
bootstrap();
