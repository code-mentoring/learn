import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character, CreateCharacterInput, UpdateCharacterInput } from './Character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character) private readonly characterRepository: Repository<Character>
  ) {}

  async findAll(): Promise<Character[]> {
    return this.characterRepository.find({ relations: ['path'] });
  }

  async create(characterInput: CreateCharacterInput): Promise<Character> {
    return this.characterRepository.create(characterInput).save();
  }

  async update(updateInput: UpdateCharacterInput): Promise<Character | undefined> {
    const { affected } = await this.characterRepository.update({ id: updateInput.id }, updateInput);
    if (affected && affected === 1) {
      return this.characterRepository.findOne({ where: { name: updateInput.name } });
    }
    throw new NotFoundException('not found');
  }

  async delete(id: string): Promise<Boolean> {
    const { affected } = await this.characterRepository.delete(id);
    if (affected && affected === 1) { return true; }
    return false;
  }
}
