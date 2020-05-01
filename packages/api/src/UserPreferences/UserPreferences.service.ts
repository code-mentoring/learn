import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPreferences, UserPreferencesInput } from './UserPreferences.entity';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreferences)
    private readonly userPreferencesRepository: Repository<UserPreferences>
  ) { }

  async findByUser(userId: string): Promise<UserPreferences | undefined> {
    return this.userPreferencesRepository.findOne({ where: { userId } });
  }

  async update(userId: string, input: UserPreferencesInput): Promise<UserPreferences> {
    const userPreferences = await this.userPreferencesRepository.findOne({ where: { userId } });
    if (userPreferences) {
      return this.userPreferencesRepository.save({ ...userPreferences, ...input });
    }
    return this.userPreferencesRepository.create({ userId, ...input }).save();
  }
}
