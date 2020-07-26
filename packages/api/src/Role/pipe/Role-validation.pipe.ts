import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { RoleType } from '../RoleType.enum';
import { RoleInput } from '../Role.entity';

@Injectable()
export class RoleValidationPipe implements PipeTransform<RoleInput> {
  async transform(
    value: RoleInput,
    { metatype }: ArgumentMetadata
  ): Promise<RoleInput> {
    const newRol: RoleInput = plainToClass(RoleInput, value);

    const roles = Object.values(RoleType);
    console.log(metatype);

    if (!roles.includes(newRol.name)) {
      throw new BadRequestException(
        `Role validation fail, name should be in  [${roles}]`
      );
    }

    return value;
  }
}
