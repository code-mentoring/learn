import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Module } from '../Module/Module.entity';

@ObjectType()
@Entity('assignment')
export class Assignment extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  description: string;

  @ManyToOne(() => Module, module => module.assignment)
  module: Module;
}

@InputType()
export class AssignmentInput {
  @Field()
  description: string;
}
