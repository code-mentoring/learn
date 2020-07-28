import { useLazyQuery } from '@apollo/react-hooks';
import { Query, QueryCheckAnswerArgs, Question as APIQuestion } from '@codement/api';
import gql from 'graphql-tag';
import shuffle from 'lodash/shuffle';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { Lesson, FooterNext } from './Lesson.container';

const checkAnswerGQ = gql`
query ($questionId: String!, $answer: String!) {
  checkAnswer(questionId: $questionId, answer: $answer)
}`;


export const Question = createContainer(() => {

  const {
    lesson,
    setFooterButtonClick,
    progress,
    attempts
  } = Lesson.useContainer();

  const [question, setQuestion] = useState<null | APIQuestion>(null);
  const [answerState, setAnswerState] = useState<null | boolean>(null);
  const [questionGrade, setQuestionState] = useState<null | boolean>(null);
  const [questionQueue, setQuestionQueue] = useState<APIQuestion[]>([]);
  const [completedQueue, setCompletedQueue] = useState<APIQuestion[]>([]);

  const [checkAnswerQuery, { data: checkAnswerData }] = useLazyQuery<
    { checkAnswer: Query['checkAnswer'] },
    QueryCheckAnswerArgs
  >(checkAnswerGQ, { fetchPolicy: 'network-only' });


  const shuffleQ = (questions: APIQuestion[]) => {
    setQuestionQueue(shuffle([...questions]));
  }

  // Initially, set question queue to lesson questions
  useEffect(() => {
    if (lesson) shuffleQ(lesson.lesson.questions);
  }, [lesson?.id]);

  // If the questionQueue runs out, reset it based on completed questions
  useEffect(() => {
    if (!questionQueue.length) shuffleQ(completedQueue);
  }, [questionQueue.length]);


  // Get a random question when lesson is loaded, or attempt is increased
  useEffect(() => {
    if (lesson) {
      setQuestionState(null);
      setFooterButtonClick(null);
      setQuestion(questionQueue[0]);
    }

    setAnswerState(null);
  }, [attempts]);


  // Once the answer is checked, update the state
  useEffect(() => {
    if (checkAnswerData !== undefined) setAnswerState(checkAnswerData.checkAnswer);
  }, [checkAnswerData]);

  // If the question answered (incorrect OR correct), complete question
  useEffect(() => {
    if (answerState !== null) completeQuestion(answerState);
  }, [answerState]);


  const checkAnswer = (answer: string) => {
    if (!question) return;
    checkAnswerQuery({ variables: { answer, questionId: question.id } })
  }


  const completeQuestion = (correct: boolean) => {
    let next: FooterNext = correct ? FooterNext.correct : FooterNext.incorrect;
    if (progress === lesson?.lesson.questions.length && correct) next = FooterNext.complete;
    setFooterButtonClick(next);
    setQuestionState(correct);

    if (correct) {
      const [correct] = questionQueue;
      // Remove first question from questionQueue and add to completedQueue
      setQuestionQueue(_q => _q.slice(1));
      setCompletedQueue(_q => [..._q, correct]);
    } else {
      /**
       * Otherwise, if user was incorrect, add the questiont to the back of the
       * queue to re-attempt
       */
      setQuestionQueue(q => {
        q.push(q.shift()!);
        return q;
      });
    }
  };

  return {
    question,
    completeQuestion,
    questionGrade,
    checkAnswer
  };
});
