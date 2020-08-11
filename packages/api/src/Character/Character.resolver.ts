import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Roles } from '../Role/Role.guard';
import { Character, CreateCharacterInput, UpdateCharacterInput } from './Character.entity';
import { CharacterService } from './Character.service';


@Resolver('Character')
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Character])
  characters() {
    return this.characterService.findAll();
  }

  @Roles('admin')
  @Mutation(() => Character)
  createCharacter(@Args('character') character: CreateCharacterInput) {
    return this.characterService.create(character);
  }

  @Roles('admin')
  @Mutation(() => Character)
  async updateCharacter(@Args('character') character: UpdateCharacterInput) {
    return this.characterService.update(character);
  }

  @Roles('admin')
  @Mutation(() => Boolean)
  async deleteCharacter(@Args('id') id: string) {
    return this.characterService.delete(id);
  }
}
