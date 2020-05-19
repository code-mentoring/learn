import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';

import { CharacterService } from './Character.service';
import { Character, CreateCharacterInput, UpdateCharacterInput } from './Character.entity';

@Resolver('Character')
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Character])
  getCharacters() {
    return this.characterService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Character)
  createCharacter(@Args('character') character: CreateCharacterInput) {
    return this.characterService.create(character);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Character)
  async updateCharacter(@Args('character') character: UpdateCharacterInput) {
    return this.characterService.update(character);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async deleteCharacter(@Args('id') id: string) {
    return this.characterService.delete(id);
  }
}
