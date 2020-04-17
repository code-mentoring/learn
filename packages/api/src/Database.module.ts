import { TypeOrmModule } from "@nestjs/typeorm";
import config from 'config';
import path from 'path';


export const DatabaseModule = TypeOrmModule.forRoot({

  ...config.get('db'),

  entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
  // @ts-ignore
  useNewUrlParser: true,
  logging: false,
})
