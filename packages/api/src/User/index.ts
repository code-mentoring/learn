import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWithPassword } from './User.entity';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserWithPassword])],
  providers: [UserResolver, UserService, UserWithPassword],
  exports: [UserService]
})
export class UserModule {}
