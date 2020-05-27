import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

import { CMBaseEntity } from '../lib/Base.entity';
import { Concept } from '../Concept/Concept.entity';
import { Lesson } from '../Lesson/Lesson.entity';

@ObjectType()
@Entity('storySection')
export class StorySection extends CMBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  order: number;

  @Column()
  @Field()
  content: string;

  @Column()
  @Field()
  lessonId?: string;

  @Column()
  @Field()
  conceptId?: string;

  @OneToOne(() => Concept, concept => concept.storySection)
  @JoinColumn()
  @Field(() => Concept)
  concept: Concept;

  @ManyToOne(() => Lesson, lesson => lesson.storySection)
  @Field(() => Lesson)
  lesson: Lesson;

}

@InputType()
export class CreateStorySectionInput {

  @Field()
  order: number;

  @Field()
  content: string;

  @Field()
  lessonId?: string;

  @Field()
  conceptId: string;

}
