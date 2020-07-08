import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StorySection {
  @Field()
  content: string;
}
