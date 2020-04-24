import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { PathUser } from '../PathUser/PathUser.entity';


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
@Unique('Name', ['name'])
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

  @OneToMany(() => PathUser, pathUser => pathUser.path)
  pathUser: PathUser[];
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
