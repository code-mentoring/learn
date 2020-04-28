import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserInput, UserWithPassword } from './User.entity';
import { UserPreferences, UserPreferencesInput } from '../UserPreferences/UserPreferences.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserWithPassword)
    private readonly userRepository: Repository<UserWithPassword>,
    @InjectRepository(UserPreferences)
    private readonly userPreferencesRespository: Repository<UserPreferences>
  ) { }

  async findAll(): Promise<UserWithPassword[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(input: UserInput): Promise<UserWithPassword> {
    const user = this.userRepository.create(input);
    user.password = await bcrypt.hash(input.password, 10);
    return this.userRepository.save(user);
  }

  async updatePreferences(input: UserPreferencesInput): Promise<UserPreferences> {
    return this.userPreferencesRespository.create(input).save();
  }
}
