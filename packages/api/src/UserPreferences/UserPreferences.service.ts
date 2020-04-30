import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPreferences, UserPreferencesInput } from './UserPreferences.entity';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreferences)
    private readonly userPreferencesRepository: Repository<UserPreferences>
  ) { }

  async findByUser(userId: string): Promise<UserPreferences> {
    const userPreference = await this.userPreferencesRepository.findOne({ where: { userId } });
    if (!userPreference) throw new NotFoundException('User preference not found');
    return userPreference;
  }

  async update(userId: string, input: UserPreferencesInput): Promise<UserPreferences> {
    const userPreferences = await this.userPreferencesRepository.findOne({ where: { userId } });
    if (userPreferences) {
      return this.userPreferencesRepository.save({ ...userPreferences, ...input });
    }
    return this.userPreferencesRepository.create({ userId, ...input }).save();
  }
}
