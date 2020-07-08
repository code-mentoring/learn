import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { CMBaseEntity } from '../lib/Base.entity';
import { ModuleLesson } from '../Module/Module.entity';
import { StorySection } from '../StorySection/StorySection.entity';

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
  taughtInId: string;

  @Field(() => ModuleLesson)
  taughtIn: ModuleLesson

  @Field(() => StorySection)
  storySection?: StorySection;
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
  taughtInId: string;
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
  taughtInId?: string;
}
