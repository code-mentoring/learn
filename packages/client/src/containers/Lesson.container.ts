import { QueryLazyOptions, useMutation } from '@apollo/react-hooks';
import { Mutation, MutationBeginLessonArgs, MutationCompleteLessonArgs } from '@codement/api';
import { ButtonProps } from '@codement/ui';
import SimpleCrypto from 'simple-crypto-js';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import lessonQuery from '../gql/queries/beginLesson.gql';

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
};


const completeLessonQ = gql`
mutation ($id: String!, $answers: String!) {
  completeLesson(id: $id, answers: $answers)
}`;


export const Lesson = createContainer(() => {
  const [lessonState, setLessonState] = useState<LessonState | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number | null>(null);
  const [footerButton, setFooterButton] = useState<ButtonProps>(intialFooterButton);
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: string]: string[] }>({});

  const [query, { data, loading, called }] = useMutation<
    { beginLesson: Mutation['beginLesson'] },
    MutationBeginLessonArgs
  >(lessonQuery);

  const [completeLesonQuery, { data: completeData }] = useMutation<
    { completeLesson: Mutation['completeLesson'] },
    MutationCompleteLessonArgs
  >(completeLessonQ);

  // Boundary setting for progress so you can't go below zero
  useEffect(() => {
    if (!progress || !data?.beginLesson) return;
    if (progress < 0) setProgress(0);
    const max = data.beginLesson.lesson.lesson.questions.length;
    if (progress > max) setProgress(max);
  }, [progress]);


  const fetchLesson = (opts: QueryLazyOptions<MutationBeginLessonArgs>) => {
    setLessonState(LessonState.story);
    query(opts);
  };

  const beginLesson = () => {
    setLessonState(LessonState.lesson);
    setProgress(0);
    setAttempts(0);
  };

  const resetLesson = () => {
    setLessonState(LessonState.story);
    setProgress(null);
  };

  const completeLesson = () => {
    const key = new SimpleCrypto(data!.beginLesson.secret);
    const answers = key.encrypt(correctAnswers).toString();

    completeLesonQuery({
      variables: { answers, id: data!.beginLesson.lesson.id }
    })
  };


  // Once lesson is completed and submitted, show in UI
  useEffect(() => {
    if (completeData?.completeLesson) {
      setLessonState(LessonState.lessonCompleted);
    }
  }, [completeData]);


  const setFooterButtonClick = (funcOrNext: FooterNext | Function | null) => {
    switch (funcOrNext) {
      case null:
        return setFooterButton(intialFooterButton);

      case FooterNext.correct:
      case FooterNext.incorrect:
        return setFooterButton({
          onClick: () => {
            setProgress(p => (p || 0) + (funcOrNext === FooterNext.correct ? 1 : -1));
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
  };

  const addCorrectAnswer = (qId: string, answer: string[]) => {
    setCorrectAnswers(a => ({ ...a, [qId]: answer }))
  }

  return {
    fetchLesson,
    lesson: data?.beginLesson.lesson,
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
    setAttempts,
    addCorrectAnswer
  };
});
