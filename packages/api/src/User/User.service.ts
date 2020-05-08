import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Md5 } from 'md5-typescript';
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

  async findById(id: string): Promise<UserWithPassword>  {
     const user = await this.userRepository.findOne({ where: { id } });
     if (!user) throw new NotFoundException('not found');
     return user;
  }

  async create(input: UserInput): Promise<UserWithPassword> {
    const user = this.userRepository.create(input);
    user.password = await bcrypt.hash(input.password, 10);
    // When in production add
    // ?r=pg&d=https:%3A%2F%2Fapi.codementoring.co%2Fstatic%2Fdefault-profile.svg;
    // to end of profileImage URL.
    user.profileImage = `https://www.gravatar.com/avatar/${Md5.init(input.email)}`;
    return this.userRepository.save(user);
  }
}
