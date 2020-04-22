import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
export class EPath {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;
}

@Entity('path')
export class Path {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}

@InputType()
export class PathInput {
  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  description: string;
}
