import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';
import { Module } from '../Module/Module.entity';
import { StorySection } from '../StorySection/StorySection.entity';

@ObjectType()
@Entity('lesson')
export class Lesson extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  moduleId: string;

  @ManyToOne(() => Module, module => module.lesson)
  @Field(() => Module)
  module: Module;

  @OneToMany(() => StorySection, storySection => storySection.lesson)
  storySection: StorySection;
}
