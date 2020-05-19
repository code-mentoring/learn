import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Character } from '../Character/Character.entity';
import { CMBaseEntity } from '../lib/Base.entity';
import { PathUser } from '../PathUser/PathUser.entity';
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

  @OneToMany(() => Module, module => module.path)
  module: Module[];

  @Column()
  @Field()
  modules: Module[];

  @OneToOne(() => Character)
  @JoinColumn()
  @Field(() => Character)
  character: Character;

  @Column()
  @Field()
  characterId: string;

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
