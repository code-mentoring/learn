import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RoleInput } from './Role.entity';

import { Repository } from 'typeorm';

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
        where: { name: role.name },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }

    if (foundRole) {
      const message = 'Role name already exists';
      throw new BadRequestException({ message });
    } else {
      try {
        savedRole = await this._roleRepository.save(role);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }

    return savedRole;
  }

  async update(roleId: string, role: RoleInput): Promise<Role | undefined> {
    const foundRole = await this._roleRepository.findOne(roleId);

    if (!foundRole) {
      throw new NotFoundException('roles search failed');
    }
    let updateRole;
    try {
      await this._roleRepository.update({ id: roleId }, role);
      updateRole = await this._roleRepository.findOne(roleId);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return updateRole;
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
