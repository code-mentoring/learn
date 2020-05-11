import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  @Field()
  authorId: string;

  @ManyToOne(() => UserWithPassword)
  @Field(() => User)
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
  authorId: string;

  @Field()
  assignmentId: string;
}
