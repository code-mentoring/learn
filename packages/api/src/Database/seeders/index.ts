import { NestFactory } from '@nestjs/core';
import Listr from 'listr';

import { AppModule } from '../../App.module';
import { UserService } from '../../User/User.service';
import { seedUsers } from './entities';
import { DatabaseService } from '../Database.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const dataBaseService = app.get(DatabaseService);

  (async () => {
    await new Listr([
      {
        title: 'Reset DB',
        task: async () => {
          dataBaseService.DANGEROUSLY_RESET_DATABASE();
        }
      },
      {
        title: 'Create users',
        task: async () => {
          await seedUsers(userService);
        }
      },
      {
        title: 'Close App',
        task: async () => app.close()
      }
    ]).run();
  })();

}
bootstrap();
