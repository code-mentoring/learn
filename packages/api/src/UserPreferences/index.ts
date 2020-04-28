import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPreferences } from './UserPreferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreferences])]
})
export class UserPreferencesModule {}
