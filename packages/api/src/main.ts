import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './App.module';
import config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || config.get('server.port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
