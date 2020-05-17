import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Character } from './Character.entity';
import { CharacterService } from './Character.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character])
  ],
  providers: [CharacterService]
})
export class CharacterModule {}
