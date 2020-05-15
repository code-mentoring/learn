import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character, CharacterInput } from './Character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character) private readonly characterRepository: Repository<Character>
  ) {}

  async create(characterInput: CharacterInput): Promise<Character> {
    return this.characterRepository.create(characterInput).save();
  }

  async findAll(): Promise< Character[]> {
    return this.characterRepository.find();
  }

  async updateById(id: string, updateInput: CharacterInput): Promise< Character | undefined> {
    await this.characterRepository.update({ id }, updateInput);
    return this.characterRepository.findOne({ id });
  }

  async updateByName(name: string, updateInput: CharacterInput): Promise< Character | undefined> {
    await this.characterRepository.update({ name }, updateInput);
    return this.characterRepository.findOne({ name });
  }

  async updateByDisplayName(displayName: string, updateInput: CharacterInput)
    : Promise< Character | undefined> {
    await this.characterRepository.update({ displayName }, updateInput);
    return this.characterRepository.findOne({ displayName });
  }
}
