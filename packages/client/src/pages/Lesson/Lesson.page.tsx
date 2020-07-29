import { Loader, theme as t } from '@codement/ui';
import React, { useEffect, useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Page } from '../../components/Page/Page';
import { Lesson, LessonState } from '../../containers/Lesson.container';
import { routes } from '../../router/routes';
import { LessonHeader } from './LessonHeader';
import { LessonQuestions } from './LessonQuestions/LessonQuestions';
import { LessonQuestionsCompleted } from './LessonQuestions/LessonQuestionsCompleted';
import { Story } from './Story/Story';
import { StoryCompleted } from './Story/StoryCompleted';


const StyledPage = styled(Page)`
  display: grid;
  grid-template-rows: ${t.size('massive')} 1fr ${t.size('massive')};
`;


export const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { fetchLesson, lesson, loading, lessonState: state, called } = Lesson.useContainer();

  useEffect(() => fetchLesson({ variables: { id: lessonId } }), [lessonId]);

  const content = useMemo(() => {
    if (loading || !called) return <Loader />;
    switch (state) {
      case LessonState.story:
        return <Story lesson={lesson!} />;
      case LessonState.storyCompleted:
        return <StoryCompleted lesson={lesson!} />;
      case LessonState.lesson:
        return <LessonQuestions lesson={lesson!} />;
      case LessonState.lessonCompleted:
        return <LessonQuestionsCompleted lesson={lesson!} />;
      default:
        return <Redirect to={routes.home()} />;
    }
  }, [state, lesson]);

  return <StyledPage title={(lesson?.name) || 'Loading...'}>
    <LessonHeader title={lesson?.name} />
    {content}
  </StyledPage>;
};
