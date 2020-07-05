import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  codeComplete = 'codeComplete',
  memoryCards = 'memoryCards'
}

registerEnumType(QuestionType, { name: 'QuestionType' });

@ObjectType()
export class CodeCompleteQuestion {
  @Field()
  file: string;

  @Field(() => [String])
  answers: string[];
}

@ObjectType()
export class Question {
  @Field()
  type: QuestionType;

  @Field(() => [CodeCompleteQuestion], { nullable: true })
  files?: CodeCompleteQuestion[];

  @Field(() => [[String]], { nullable: true })
  pairs?: string[][];
}

@InputType()
export class QuestionInput {
  @Field()
  pathId: string;

  @Field()
  moduleIndex: number;

  @Field()
  type?: string;
}
