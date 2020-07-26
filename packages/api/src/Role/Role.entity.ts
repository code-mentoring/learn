import {
  Entity,
  Column,
  ManyToMany,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserWithPassword } from '../User/User.entity';
import { CMBaseEntity } from '../lib/Base.entity';
import { RoleType } from './RoleType.enum';
import {
  ObjectType,
  Field,
  ID,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';

registerEnumType(RoleType, {
  name: 'RoleType',
});

@ObjectType()
export class Roles {
  @Field(() => ID)
  id: string;

  @Field()
  name: RoleType;

  @Field()
  description: string;
}

@Entity('roles')
@Unique(['name'])
export class Role extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'simple-enum',
    enum: RoleType,
    default: RoleType.STUDENT,
  })
  name: RoleType;

  @Column({ type: 'varchar', length: 100 })
  description!: string;

  @ManyToMany(() => UserWithPassword, (user) => user.roles)
  @JoinColumn()
  users!: UserWithPassword[];
}

@InputType()
export class RoleInput {
  @Field()
  name: RoleType;

  @Field()
  description: string;
}
