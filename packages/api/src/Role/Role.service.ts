import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleInput, RoleUpdateInput } from './Role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly _roleRepository: Repository<Role>
  ) {}

  async findById(rolId: string): Promise<Role> {
    const success = false;
    let message = 'rolId must be sent';
    if (!rolId) {
      throw new BadRequestException({ success, message });
    }
    let role: Role | undefined;
    try {
      role = await this._roleRepository.findOne(rolId);
    } catch (error) {
      message = `we had a problem making the request to the database: ${error.error}`;
      throw new InternalServerErrorException({ success, message });
    }

    if (!role) {
      message = 'rolId not found';
      throw new NotFoundException({ success, message });
    }

    return role;
  }

  async findAll(): Promise<Role[]> {
    let roles: Role[];
    try {
      roles = await this._roleRepository.find();
    } catch (error) {
      const success = false;
      const message = 'we had a problem making the request to the database';
      throw new InternalServerErrorException({ success, message });
    }
    return roles;
  }

  async create(role: RoleInput): Promise<Role> {
    let savedRole;
    let foundRole: Role | undefined;

    try {
      foundRole = await this._roleRepository.findOne({
        where: { name: role.name }
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (foundRole) {
      const message = 'Role name already exists';
      throw new BadRequestException({ message });
    } else {
      try {
        savedRole = await this._roleRepository.create(role).save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }

    return savedRole;
  }

  async update(role: RoleUpdateInput): Promise<Role | undefined> {
    let foundRole = await this._roleRepository.findOne(role.id);

    if (!foundRole) {
      throw new NotFoundException('roles search failed');
    }

    try {
      foundRole.description = role.description;
      foundRole = await this._roleRepository.save(foundRole);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return foundRole;
  }

  async delete(roleId: string): Promise<Boolean> {
    const roleExists = await this._roleRepository.findOne(roleId);
    if (!roleExists) {
      throw new NotFoundException('rolesId not found');
    }

    try {
      await this._roleRepository.delete(roleId);
    } catch (error) {
      throw new InternalServerErrorException(
        'we had a problem making the request to the database'
      );
    }
    return true;
  }
}
