import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../UserModule/UserModule.entity';
import { UserModuleResolver } from './UserModule.resolver';
import { UserModuleService } from './UserModule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModule])
  ],
  providers: [UserModuleResolver, UserModuleService]
})
export class UserModuleModule {}
