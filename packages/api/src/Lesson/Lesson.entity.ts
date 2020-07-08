/**
 * NOTE: This entity is NOT stored in the database
 * Instead, it is stored in the `content` directory, and exposed with the CMS
 */
import { Field, ObjectType } from '@nestjs/graphql';

import { Question, QuestionUnion } from '../Question/Question.entity';
import { StorySection } from '../StorySection/StorySection.entity';


@ObjectType()
export class Lesson {

  @Field(() => [StorySection])
  storySections: StorySection[];

  @Field(() => [QuestionUnion])
  questions: Question[]
}
