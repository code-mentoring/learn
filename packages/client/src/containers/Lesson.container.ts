import { useLazyQuery, QueryLazyOptions } from '@apollo/react-hooks';
import { Query, QueryLessonArgs, Question } from '@codement/api';
import { createContainer } from 'unstated-next';
import random from 'lodash/sample';

import { useState, useEffect } from 'react';
import lessonQuery from '../gql/queries/lesson.gql';

export enum LessonState {
  story = 'story',
  storyCompleted = 'storyCompleted',
  lesson = 'lesson',
  lessonCompleted = 'lessonCompleted',
}

export const Lesson = createContainer(() => {
  const [lessonState, setLessonState] = useState<LessonState | null>(null);
  const [progress, setProgress] = useState<number>();
  const [footerButtonClick, _setFooterButtonClick] = useState<null | Function>(null);
  const [footerButtonText, setFooterButtonText] = useState<'Check' | 'Next'>('Check');
  const [question, setQuestion] = useState<null | Question>(null);
  const [questionGrade, setQuestionState] = useState<null | boolean>(null)

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
    getRandomQuestion();
    setLessonState(LessonState.lesson);
    setProgress(0);
  }

  const resetLesson = () => {
    setLessonState(LessonState.story);
    setProgress(undefined);
    setQuestion(null);
  }

  // Fetch new question and reset
  const getRandomQuestion = () => {
    if (!data?.lesson) throw new Error('Lesson is not loaded yet');
    const q = random(data.lesson.lesson.questions)!;
    setQuestion(q);
    setQuestionState(null);
    return q;
  }

  const completeQuestion = (success: boolean) => {
    setFooterButtonClick('next');
    setProgress(p =>(p || 0) + (success ? 1 : -1));
    setQuestionState(success);
  }


  const setFooterButtonClick = (funcOrNext: 'next' | Function | null) => {
    switch(funcOrNext) {
      case null:
        _setFooterButtonClick(null);
        setFooterButtonText('Check');
        break;

      case 'next':
        _setFooterButtonClick(() => getRandomQuestion);
        setFooterButtonText('Next');
        break;

      default: // Set to "check" function (check answer with API)
        _setFooterButtonClick(() => funcOrNext);
        setFooterButtonText('Check');
        break;
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
    setProgress,
    resetLesson,
    beginLesson,
    getRandomQuestion,
    question,
    footerButtonClick,
    setFooterButtonClick,
    footerButtonText,
    completeQuestion,
    questionGrade
  };
});
