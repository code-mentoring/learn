import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character, CreateCharacterInput, UpdateCharacterInput } from './Character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character) private readonly characterRepository: Repository<Character>
  ) {}

  async create(characterInput: CreateCharacterInput): Promise<Character> {
    return this.characterRepository.create(characterInput).save();
  }

  async update(id: string, updateInput: UpdateCharacterInput): Promise<Character | undefined> {
    await this.characterRepository.update({ id }, updateInput);
    return this.characterRepository.findOne({ where: { name: updateInput.name } });
  }

}
