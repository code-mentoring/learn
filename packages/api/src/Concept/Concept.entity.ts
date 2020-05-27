import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { CMBaseEntity } from '../lib/Base.entity';
import { Module } from '../Module/Module.entity';
import { StorySection } from '../StorySection/StorySection.entity';
import { UserConcept } from '../UserConcepts/UserConcept.entity';

@ObjectType()
@Entity('concept')
@Unique(['name'])
export class Concept extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  icon: string;

  @Column()
  @Field()
  moduleId: string;

  @ManyToOne(() => Module, module => module.concepts)
  @Field(() => Module)
  module: Module

  @OneToOne(() => StorySection, storySection => storySection.concept)
  storySection: StorySection;

  @OneToMany(() => UserConcept, userConcept => userConcept.concept)
  @Field(() => [UserConcept])
  userConcepts: UserConcept[];
}

@InputType()
export class CreateConceptInput {
  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  description: string;

  @Field()
  moduleId: string;
}

@InputType()
export class UpdateConceptInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  moduleId?: string;
}
