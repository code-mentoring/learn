import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from './Character.entity';
import { CharacterResolver } from './Character.resolver';
import { CharacterService } from './Character.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character])
  ],
  providers: [CharacterResolver, CharacterService]
})
export class CharacterModule {}
