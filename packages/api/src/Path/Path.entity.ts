import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { PathUser } from '../PathUser/PathUser.entity';
import { ECharacter } from '../Module/Character/Character.entity';
import { Module } from '../Module/Module.entity';

@ObjectType()
@Entity('path')
@Unique('Name', ['name'])
export class Path extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  icon: string;

  @Column()
  @Field()
  description: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @OneToMany(() => PathUser, pathUser => pathUser.path)
  pathUser: PathUser[];

  @OneToMany(() => ECharacter, character => character.path)
  character: ECharacter[];

  @OneToMany(() => Module, module => module.path)
  module: Module[];
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
