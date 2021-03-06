import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';


@Resolver('Question')
export class QuestionResolver {
  constructor(private readonly cms: CMS) { }

  // NOTE: Not used
  // @UseGuards(GQLAuthGuard)
  // @Query(() => [QuestionUnion])
  // questions(
  //   @Args('pathId') pathId: string,
  //   @Args('moduleIndex') moduleIndex: number,
  //   @Args('type', { nullable: true }) type: QuestionType
  // ) {
  //   const questions = <Question[]>this.cms.findQuestions(pathId, moduleIndex);

  //   if (type) {
  //     return questions.filter(q => q.type === type);
  //   }
  //   return questions;
  // }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Boolean])
  checkAnswer(
    @Args('questionId') questionId: string,
    @Args('answer', { type: () => [String] }) answer: string[]
  ) {
    return this.cms.checkAnswer(questionId, answer);
  }
}
