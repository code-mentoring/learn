import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { ModuleAssignment } from '../Module/Module.entity';


@ObjectType()
@Entity('assignment')
export class Assignment extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  moduleId: string;

  @Field(() => ModuleAssignment)
  module: ModuleAssignment;
}
