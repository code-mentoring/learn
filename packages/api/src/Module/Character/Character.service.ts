import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ECharacter, Character, CharacterInput } from './Character.entity';
import { Path } from '../../Path/Path.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(ECharacter) private readonly characterRepository: Repository<ECharacter>
  ) {}

  async findAll(): Promise<Character[]> {
    return this.characterRepository.find({ relations: ['previous', 'path'] });
  }

  async create(
    characterInput: CharacterInput
  ): Promise<Character> {

    const newCharacter = new ECharacter();
    newCharacter.name = characterInput.name;
    newCharacter.displayName = characterInput.displayName;

    const path = await Path.findOne({ id: characterInput.path });
    if (!path) throw new NotFoundException();
    newCharacter.path = path;

    let previous: ECharacter | undefined;
    if (characterInput.previous) {
      previous = await ECharacter.findOne({ id: characterInput.previous });
      if (!previous) throw new NotFoundException();
      newCharacter.previous = previous;
    }

    return newCharacter.save();
  }
}
