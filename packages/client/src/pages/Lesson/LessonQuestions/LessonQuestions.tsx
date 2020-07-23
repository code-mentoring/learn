import { ModuleLesson, QuestionType, QuestionMultiChoice } from '@codement/api';
import { theme as t, Text, Button } from '@codement/ui';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Lesson } from '../../../containers/Lesson.container';
import { QMultiChoice } from './questions/QMultiChoice/QMultiChoice';
import { LessonFooter } from '../LessonFooter';
import { QuestionResult } from '../../../components/QuestionResult/QuestionResult';

export interface LessonQuestionsProps {
  lesson: ModuleLesson;
}


const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuestionTitle = styled(Text)`
  text-align: center;
  margin-bottom: ${t.size('xbig')};
`;

const QuestionFrame = styled.article`
  background: ${t.color('grey.100')};
  border-radius: ${t.borderRadius.default};
  display: flex;
  max-width: 92rem;
  width: 100%;
  & > * {
    flex-basis: 50%;
    justify-content: center;
  }
`;

const Result = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -${t.size('big')};
`;

const questionTitles: { [key in QuestionType]: string } = {
  dragDrop: 'Drag and drop the missing code.',
  memory: 'Match the correct items.',
  multiChoice: 'Choose the correct code to complete this section.',
  bugHighlight: 'Highlight the bug in the following code.'
}

export const LessonQuestions: React.FC<LessonQuestionsProps> = () => {
  const { question, footerButtonClick, footerButtonText, questionGrade} = Lesson.useContainer();
  const q = question!;

  const content = useMemo(() => {
    switch (q.type) {
      case QuestionType.MultiChoice:
        return <QMultiChoice question={q as QuestionMultiChoice} key={q.id} />;
      default:
        console.warn(`Unknown question type '${q.type}'`);
        return null;
    }
  }, [q.id]);

  return <>
    <QuestionWrapper>
      <QuestionTitle variant="h2" color="grey.700">
        {questionTitles[q.type]}
      </QuestionTitle>

      <QuestionFrame>
        {content}
      </QuestionFrame>
    </QuestionWrapper>

    <LessonFooter>
      {(questionGrade !== null) &&
        <Result>
          <QuestionResult state={questionGrade ? 'success' : 'error'}>
            Some result
          </QuestionResult>
        </Result>
      }

      <Button
        disabled={!Boolean(footerButtonClick)}
        onClick={() => footerButtonClick?.()}
      >{footerButtonText}</Button>
    </LessonFooter>
  </>
}
