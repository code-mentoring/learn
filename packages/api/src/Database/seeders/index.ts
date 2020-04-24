import { NestFactory } from '@nestjs/core';
import Listr from 'listr';

import { AppModule } from '../../App.module';
import { UserService } from '../../User/User.service';
import { seedUsers } from './entities';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  (async () => {
    await new Listr([
      {
        title: 'Create users',
        task: async () => seedUsers(userService)
      },
      {
        title: 'Closing App',
        task: async () => app.close()
      }
    ]).run();
  })();

}
bootstrap();
