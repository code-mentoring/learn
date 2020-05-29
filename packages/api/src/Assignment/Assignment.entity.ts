import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @Column()
  @Field()
  moduleId: string;

  @ManyToOne(() => Module)
  @Field(() => Module)
  module: Module;
}

@InputType()
export class CreateAssignmentInput {
  @Field()
  description: string;

  @Field()
  moduleId: string;
}

@InputType()
export class UpdateAssignmentInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  moduleId?: string;
}
