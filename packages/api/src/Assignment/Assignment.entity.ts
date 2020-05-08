import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
// import { Module } from '../Module/Module.entity';
// import { AssignmentFile } from '../AssignmentFile/AssignmentFile.entity';

@ObjectType()
@Entity('assignment')
@Unique(['moduleId'])
export class Assignment extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  moduleId: string;

  @Column()
  @Field()
  description: string;

  // @OneToMany(() => AssignmentFile, assignmentFile => assignmentFile.assignment)
  // assignmentFiles: AssignmentFile[];


  // @ManyToOne(() => Module, module =>  module.assignment)
  // module: Module;
}

@InputType()
export class AssignmentInput {
  @Field()
  description: string
}
