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
    // Upsert with validation check
    const existing = await this.userPreferencesRepository.findOne({ where: { userId } });
    if (existing) {
      Object.assign(existing, input);
      return this.userPreferencesRepository.save(existing);
    }
    return this.userPreferencesRepository.create({ userId, ...input }).save();
  }
}
