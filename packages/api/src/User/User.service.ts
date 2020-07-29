import {
  Injectable,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import { Repository } from 'typeorm';

import { UserInput, UserWithPassword } from './User.entity';
import { Role } from '../Role/Role.entity';
import { RoleType } from '../Role/RoleType.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserWithPassword)
    private readonly userRepository: Repository<UserWithPassword>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
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

    const defaultRole = await this.roleRepository.findOne({
      where: { name: RoleType.STUDENT }
    });

    if (defaultRole !== undefined) {
      user.roles = [defaultRole];
    }

    user.password = await bcrypt.hash(input.password, 10);
    // When in production add
    // ?r=pg&d=https:%3A%2F%2Fapi.codementoring.co%2Fstatic%2Fdefault-profile.svg;
    // to end of profileImage URL.
    user.profileImage = `https://www.gravatar.com/avatar/${md5(input.email)}`;
    return this.userRepository.save(user);
  }

  async addRoleToUser(userId: string, roleName: RoleType) {
    let user: UserWithPassword | undefined;
    try {
      user = await this.userRepository.findOne({
        where: { id: userId }
      });
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error.error}`;
      throw new InternalServerErrorException(message);
    }

    if (!user) {
      throw new NotFoundException('User id not found');
    }

    let newRole: Role | undefined;
    try {
      newRole = await this.roleRepository.findOne({
        where: { name: roleName }
      });
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error.error}`;
      throw new InternalServerErrorException(message);
    }

    if (newRole) {
      if (!user.roles.find(rl => rl.name === newRole?.name)) {
        user.roles.push(newRole);
        user = await this.userRepository.save(user);
      }
    }

    return user;
  }

  async removeRoleToUser(userId: string, roleName: RoleType) {
    let user;
    try {
      user = await this.userRepository.findOne({
        where: { id: userId }
      });
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error.error}`;
      throw new InternalServerErrorException(message);
    }

    if (!user) {
      throw new NotFoundException('User id not found');
    }

    let role: Role | undefined;
    try {
      role = await this.roleRepository.findOne({
        where: { name: roleName }
      });
    } catch (error) {
      const message = `we had a problem making the request to the database: ${error.error}`;
      throw new InternalServerErrorException(message);
    }

    if (role) {
      user.roles = user.roles.filter(rl => rl.name !== role?.name);
    }

    return this.userRepository.save(user);
  }
}
