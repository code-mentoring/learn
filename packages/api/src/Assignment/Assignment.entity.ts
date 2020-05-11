import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
// import { Module } from '../Module/Module.entity';

@ObjectType()
@Entity('assignment')
// @Unique(['moduleId'])
export class Assignment extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  description: string;

  // TODO: Uncomment once Module module is available.
  // @ManyToOne(() => Module, module =>  module.assignment)
  // module: Module;
}

@InputType()
export class AssignmentInput {
  @Field()
  description: string
}
