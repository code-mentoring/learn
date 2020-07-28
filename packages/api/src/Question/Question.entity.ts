/**
 * NOTE: This entity is NOT stored in the database
 * Instead, it is stored in the `content` directory, and exposed with the CMS
 */
import { createUnionType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';


export enum QuestionType {
  multiChoice = 'multiChoice',
  memory = 'memory',
  dragDrop = 'dragDrop',
  bugHighlight = 'bugHighlight'
}

registerEnumType(QuestionType, {
  name: 'QuestionType'
});

@ObjectType()
export class BaseQuestion {
  @Field()
  id: string;
}


// ---------------------------------------------------------------- Multi choice

@ObjectType()
export class QuestionMultiChoice extends BaseQuestion {
  @Field(() => [String])
  options: string[];

  @Field()
  code: string;

  @Field(() => QuestionType)
  type: QuestionType.multiChoice;

  answer: number;
}


// ---------------------------------------------------------------------- Memory
@ObjectType()
export class QuestionMemory extends BaseQuestion {
  @Field(() => QuestionType)
  type: QuestionType.memory;

  @Field(() => [[String]])
  pairs: [string, string][];
}


// ----------------------------------------------------------------- Drag & Drop
@ObjectType()
export class QuestionDragDrop extends BaseQuestion {
  @Field(() => QuestionType)
  type: QuestionType.dragDrop;

  @Field(() => [String])
  options: string[]

  @Field()
  code: string;
}

// ----------------------------------------------------------------- Drag & Drop
@ObjectType()
export class QuestionBugHighlight extends BaseQuestion {
  @Field(() => QuestionType)
  type: QuestionType.bugHighlight;

  @Field()
  code: string;
}


// ----------------------------------------------------------------------- Union
export type Question =
  QuestionMultiChoice |
  QuestionMemory |
  QuestionDragDrop |
  QuestionBugHighlight;

export const QuestionUnion = createUnionType({
  name: 'Question',
  types: () => [QuestionMultiChoice, QuestionMemory, QuestionDragDrop, QuestionBugHighlight],
  resolveType(value) {
    switch (value.type) {
      case QuestionType.multiChoice: return QuestionMultiChoice;
      case QuestionType.memory: return QuestionMemory;
      case QuestionType.dragDrop: return QuestionDragDrop;
      case QuestionType.bugHighlight: return QuestionBugHighlight;
      default: return null;
    }
  }
});
