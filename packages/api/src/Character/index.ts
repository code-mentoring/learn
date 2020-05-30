import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from './Character.entity';
import { CharacterService } from './Character.service';
import { CharacterResolver } from './Character.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character])
  ],
  providers: [CharacterService, CharacterResolver],
  exports: [CharacterService]
})
export class CharacterModule {}
