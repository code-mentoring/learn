import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { Assignment } from '../Assignment/Assignment.entity';
import { UserWithPassword, User } from '../User/User.entity';

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

  @Column()
  @Field()
  assignmentId: string;

  @ManyToOne(() => Assignment)
  @Field(() => Assignment)
  assignment: Assignment;

  @Column()
  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
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
  author: string;

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
