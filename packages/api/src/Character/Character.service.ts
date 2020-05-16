import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character, CharacterCreateInput, CharacterUpdateInput } from './Character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character) private readonly characterRepository: Repository<Character>
  ) {}

  async create(characterInput: CharacterCreateInput): Promise<Character> {
    return this.characterRepository.create(characterInput).save();
  }

  async findAll(): Promise< Character[]> {
    return this.characterRepository.find();
  }

  async findById(id: string): Promise< Character | undefined> {
    return this.characterRepository.findOne({ id });
  }

  async findByName(name: string): Promise< Character | undefined> {
    return this.characterRepository.findOne({ name });
  }

  async findByDisplayName(displayName: string): Promise< Character | undefined> {
    return this.characterRepository.findOne({ displayName });
  }

  async updateById(id: string, updateInput: CharacterUpdateInput): Promise< Boolean> {
    const { affected } = await this.characterRepository.update({ id }, updateInput);
    if (affected && affected > 0) { return true; }
    return false;
  }

  async updateByName(name: string, updateInput: CharacterUpdateInput): Promise< Boolean > {
    const { affected } = await this.characterRepository.update({ name }, updateInput);
    if (affected && affected > 0) { return true; }
    return false;
  }

  async updateByDisplayName(displayName: string, updateInput: CharacterUpdateInput)
    : Promise< Boolean > {
    const { affected } = await this.characterRepository.update({ displayName }, updateInput);
    if (affected && affected > 0) { return true; }
    return false;
  }
}
