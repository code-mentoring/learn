import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'config';
import path from 'path';

// Database connection details based on the NODE_ENV
const db = process.env.NODE_ENV === 'production'
  ? { type: 'postgres', url: process.env.DATABASE_URL }
  : config.get('db') as {};


/**
 * TypeORM module to connect to database
 */
export const TypeORMModule = TypeOrmModule.forRoot({
  ...db,
  entities: [path.join(__dirname, '../**/**.entity{.ts,.js}')],
  synchronize: true,
  // @ts-ignore
  useNewUrlParser: true,
  logging: false,
  keepConnectionAlive: true
});
