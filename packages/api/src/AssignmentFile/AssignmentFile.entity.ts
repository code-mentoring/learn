import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Assignment } from '../Assignment/Assignment.entity';
import { UserWithPassword, User } from '../User/User.entity';

@ObjectType()
@Entity('assignmentFile')
@Unique('assignment_author', ['assignmentId', 'authorId'])
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

  @Column()
  @Field()
  assignmentId: string;

  @Column()
  @Field()
  authorId: string;

  @ManyToOne(() => Assignment)
  @Field(() => Assignment)
  assignment: Assignment;

  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
  author: UserWithPassword;
}

@InputType()
export class CreateAssignmentFileInput {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  content: string;

  @Field()
  assignmentId: string;
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
