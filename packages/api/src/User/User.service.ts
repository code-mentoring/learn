import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

import { UserInput, UserWithPassword } from './User.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserWithPassword)
    private readonly userRepository: Repository<UserWithPassword>,
  ) { }

  async findAll(): Promise<UserWithPassword[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({where: {email}});
  }

  async create(input: UserInput): Promise<UserWithPassword> {
    const user = new UserWithPassword();
    user.id = uuid.v4();
    Object.assign(user, input);
    user.password = await bcrypt.hash(input.password, 10);
    return this.userRepository.save(user);
  }
}
