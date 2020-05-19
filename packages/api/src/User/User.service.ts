import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import { Repository } from 'typeorm';

import { UserInput, UserWithPassword } from './User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserWithPassword)
    private readonly userRepository: Repository<UserWithPassword>
  ) {}

  async findAll(): Promise<UserWithPassword[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async search(query: string): Promise<UserWithPassword[]> {
    return this.userRepository.find({
      where: [{ firstName: query }, { lastName: query }, { email: query }]
    });
  }

  async create(input: UserInput): Promise<UserWithPassword> {
    const user = this.userRepository.create(input);
    user.password = await bcrypt.hash(input.password, 10);
    // When in production add
    // ?r=pg&d=https:%3A%2F%2Fapi.codementoring.co%2Fstatic%2Fdefault-profile.svg;
    // to end of profileImage URL.
    user.profileImage = `https://www.gravatar.com/avatar/${md5(input.email)}`;
    return this.userRepository.save(user);
  }
}
