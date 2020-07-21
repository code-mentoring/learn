import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { QuestionType, QuestionUnion, Question } from './Question.entity';
import { CMS } from '../CMS/CMS';

@Resolver('Question')
export class QuestionResolver {
  constructor(private readonly cms: CMS) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [QuestionUnion])
  questions(
    @Args('pathId') pathId: string,
    @Args('moduleIndex') moduleIndex: number,
    @Args('type', { nullable: true }) type: QuestionType
  ) {
    const questions = <Question[]> this.cms.findQuestions(pathId, moduleIndex);

    if (type) {
      return questions.filter(q => q.type === type);
    }
    return questions;
  }
}
