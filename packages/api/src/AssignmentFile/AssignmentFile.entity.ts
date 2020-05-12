import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Assignment } from '../Assignment/Assignment.entity';
import { UserWithPassword } from '../User/User.entity';

@ObjectType()
@Entity('assignmentFile')
export class AssignmentFile extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => Assignment, assignment => assignment.assignmentFile)
  assignment: Assignment;

  @ManyToOne(() => UserWithPassword, user => user.assignmentFile)
  @JoinColumn({ name: 'author' })
  author: UserWithPassword;
}

@InputType()
export class AssignmentFileInput {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  content: string;

  @Field()
  assignmentId: string;

  @Field(() => UserWithPassword)
  author: UserWithPassword;
}

@InputType()
export class UpdateAssignmentFileInput {

  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  assignmentId?: string;
}
