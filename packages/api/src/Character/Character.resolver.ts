import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Character, CharacterUpdateInput, CharacterIndex, CharacterCreateInput } from './Character.entity';
import { CharacterService } from './Character.service';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Character])
  characters() {
    return this.characterService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => Character)
  getCharacter(@Args('index') index: CharacterIndex) {
    if (index.id) {
      return this.characterService.findById(index.id);
    }
    if (index.name) {
      return this.characterService.findByName(index.name);
    }
    if (index.displayName) {
      return this.characterService.findByDisplayName(index.displayName);
    }
    throw new Error('please input one index');
  }

  // Character is created when create Path
  // createCharacter may not needed, but it will be used in test script
  @UseGuards(GQLAuthGuard)
  @Mutation(() => Character)
  createCharacter(
    @Args('character') character: CharacterCreateInput
  ) {
    return this.characterService.create(character);
  }

  // the entry point is through Path, so the update will be through characterId
  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  updateCharacter(
    @Args('index') index: CharacterIndex,
    @Args('update') update: CharacterUpdateInput
  ) {
    if (index.id) {
      return this.characterService.updateById(index.id, update);
    } if (index.name) {
      return this.characterService.updateByName(index.name, update);
    } if (index.displayName) {
      return this.characterService.updateByDisplayName(index.displayName, update);
    }
    throw new Error('please input one index');
  }
}
