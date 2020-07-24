import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, Unique } from 'typeorm';

import { Character } from '../Character/Character.entity';
import { CMBaseEntity } from '../lib/Base.entity';
import { Module, ModuleUnion } from '../Module/Module.entity';
import { PathUser } from '../PathUser/PathUser.entity';


export enum PathName {
  html = 'html',
  js = 'js',
  css = 'css'
}

registerEnumType(PathName, {
  name: 'PathName'
});

@ObjectType()
@Entity('path')
@Unique('Name', ['name'])
export class Path extends CMBaseEntity {
  @PrimaryColumn({ enum: Object.values(PathName) })
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

  @Field(() => [ModuleUnion])
  modules: Module[];

  @OneToOne(() => Character, { nullable: true })
  @JoinColumn()
  @Field(() => Character, { nullable: true })
  character: Character;

  @Column({ nullable: true })
  @Field({ nullable: true })
  characterId?: string;

  @Field()
  progress: number;
}

@InputType()
export class PathInput {
  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  characterId?: string;
}

@InputType()
export class UpdatePathInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  characterId?: string;
}
