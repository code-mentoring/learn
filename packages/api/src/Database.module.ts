import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import path from 'path';

const db = process.env.NODE_ENV === 'production'
  ? {
    type: 'postgres',
    url: process.env.DATABASE_URL
  }
  : config.get('db') as {}


export const DatabaseModule = TypeOrmModule.forRoot({

  ...db,

  entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
  // @ts-ignore
  useNewUrlParser: true,
  logging: false,
})
