import { ModuleLesson, QuestionType, QuestionMultiChoice, QuestionMemory, QuestionDragDrop } from '@codement/api';
import { theme as t, Text, Button, aniFadeUp } from '@codement/ui';
import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Lesson } from '../../../containers/Lesson.container';
import { Question } from '../../../containers/Question.container';
import { QMultiChoice } from './questions/QMultiChoice/QMultiChoice';
import { LessonFooter } from '../LessonFooter';
import { QuestionResult } from '../../../components/QuestionResult/QuestionResult';
import { QMemory } from './questions/QMemory/QMemory';
import { CONFIG } from '../../../config';
import { QDragDrop } from './questions/QDragDrop/QDragDrop';

export interface LessonQuestionsProps {
  lesson: ModuleLesson;
}


const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 72rem;
`;

const QuestionTitle = styled(Text)`
  text-align: center;
  margin-bottom: ${t.size('xbig')};
  ${aniFadeUp}
`;

const QuestionFrame = styled.article`
  background: ${t.color('grey.100')};
  border-radius: ${t.borderRadius.default};
  max-width: 92rem;
  width: 100%;
  ${aniFadeUp};
  animation-delay: 0.1s;
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
};

export const LessonQuestions: React.FC<LessonQuestionsProps> = () => {
  const { footerButton, attempts } = Lesson.useContainer();
  const { question, questionGrade, completeQuestion } = Question.useContainer();
  const q = question;

  const Content = useMemo(() => {
    if (!q) return null;
    switch (q.type) {
      case QuestionType.MultiChoice:
        return () => <QMultiChoice question={q as QuestionMultiChoice} key={attempts!} />;
      case QuestionType.Memory:
        return () => <QMemory question={q as QuestionMemory} key={attempts!} />;
      case QuestionType.DragDrop:
        return () => <QDragDrop question={q as QuestionDragDrop} key={attempts!} />;
      default:
        // eslint-disable-next-line no-console
        console.warn(`Unknown question type '${q.type}'`);
        return null;
    }
  }, [attempts, q]);


  /**
   * Cheat mode on dev to skip questions with "shift" + "space"
   * If you also hold "Alt" it will complete with a failure
   */
  if (!CONFIG.isProd) {
    useEffect(() => {
      window.addEventListener('keyup', e => {
        if (e.keyCode === 32 && e.shiftKey) completeQuestion(!e.altKey);
      });
    }, []);
  }


  return <>
    <QuestionWrapper>
      <QuestionTitle variant="h2" color="grey.700">
        {q && questionTitles[q.type]}
      </QuestionTitle>

      <QuestionFrame> {Content && <Content />} </QuestionFrame>

    </QuestionWrapper>

    <LessonFooter>
      {(questionGrade !== null)
        && <Result>
          <QuestionResult state={questionGrade ? 'success' : 'error'}>
            Some result
          </QuestionResult>
        </Result>
      }

      <Button
        disabled={!footerButton?.onClick}
        {...footerButton}
      />
    </LessonFooter>
  </>;
};
