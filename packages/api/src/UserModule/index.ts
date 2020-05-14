import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './UserModule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModule])]
})
export class UserModuleModule {}
