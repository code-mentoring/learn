import { QueryLazyOptions, useLazyQuery } from '@apollo/react-hooks';
import { Query, QueryLessonArgs } from '@codement/api';
import { ButtonProps } from '@codement/ui';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import lessonQuery from '../gql/queries/lesson.gql';


export enum LessonState {
  story = 'story',
  storyCompleted = 'storyCompleted',
  lesson = 'lesson',
  lessonCompleted = 'lessonCompleted',
}

export enum FooterNext {
  complete,
  correct,
  incorrect
}

const intialFooterButton: ButtonProps = {
  onClick: undefined,
  children: 'Check',
  color: 'primary'
}

export const Lesson = createContainer(() => {
  const [lessonState, setLessonState] = useState<LessonState | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number | null>(null);
  const [footerButton, setFooterButton] = useState<ButtonProps>(intialFooterButton);

  const [query, { data, loading, called }] = useLazyQuery<
    { lesson: Query['lesson'] },
    QueryLessonArgs
  >(lessonQuery);

  // Boundary setting for progress so you can't go below zero
  useEffect(() => {
    if (!progress || !data?.lesson) return;
    if (progress < 0) setProgress(0);
    const max = data.lesson.lesson.questions.length;
    if (progress > max) setProgress(max);
  }, [progress]);

  const fetchLesson = (opts: QueryLazyOptions<QueryLessonArgs>) => {
    setLessonState(LessonState.story);
    query(opts);
  };

  const beginLesson = () => {
    setLessonState(LessonState.lesson);
    setProgress(0);
    setAttempts(0);
  }

  const resetLesson = () => {
    setLessonState(LessonState.story);
    setProgress(null);
  }

  const completeLesson = () => {
    setLessonState(LessonState.lessonCompleted);
  };

  const setFooterButtonClick = (funcOrNext: FooterNext | Function | null) => {
    switch (funcOrNext) {
      case null:
        return setFooterButton(intialFooterButton);

      case FooterNext.correct:
      case FooterNext.incorrect:
        return setFooterButton({
          onClick: () => {
            setProgress(p => (p || 0) + (funcOrNext === FooterNext.correct ? 1 : -1))
            setAttempts(a => a! + 1);
          },
          children: 'Next',
          color: funcOrNext === FooterNext.correct ? 'secondary' : 'tertiary',
          icon: 'arrowRight',
          iconPosition: 'right'
        });

      case FooterNext.complete:
        return setFooterButton({
          onClick: () => completeLesson(),
          children: 'Complete',
          color: 'secondary',
          icon: 'check',
          iconPosition: 'right'
        });

      default: // Set to "check" function (check answer with API)
        return setFooterButton({
          onClick: () => funcOrNext(),
          children: 'Check',
          color: 'primary'
        });
    }
  }

  return {
    fetchLesson,
    lesson: data?.lesson,
    called,
    loading,
    lessonState,
    setLessonState,
    progress,
    resetLesson,
    beginLesson,
    footerButton,
    setFooterButtonClick,
    attempts,
    setAttempts
  };
});
