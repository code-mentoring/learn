import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../../Auth/GQLAuth.guard';
import { Character, CharacterInput } from './Character.entity';
import { CharacterService } from './Character.service';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Character])
  modules() {
    return this.characterService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Character)
  createModule(
    @Args('character') character: CharacterInput
  ) {
    return this.characterService.create(character);
  }

}