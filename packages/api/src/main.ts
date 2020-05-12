import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from 'config';
import { AppModule } from './App.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: config.get('server.logger'),
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || config.get('server.port'));
  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
