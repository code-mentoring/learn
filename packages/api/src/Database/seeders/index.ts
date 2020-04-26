import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../App.module';
import { SeederService } from './Seeders.service';

export async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seedersService = app.get(SeederService);
  await seedersService.seedAll();
  app.close();

}
bootstrap();
