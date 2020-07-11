import { useLazyQuery, QueryLazyOptions } from '@apollo/react-hooks';
import { Query, QueryLessonArgs } from '@codement/api';
import { createContainer } from 'unstated-next';

import { useState } from 'react';
import lessonQuery from '../gql/queries/lesson.gql';

export enum LessonState {
  story = 'story',
  storyCompleted = 'storyCompleted',
  lesson = 'lesson',
  lessonCompleted = 'lessonCompleted',
}

export const Lesson = createContainer(() => {
  const [state, setState] = useState<LessonState | null>(null);

  const [query, { data, loading, called }] = useLazyQuery<
    { lesson: Query['lesson'] },
    QueryLessonArgs
  >(lessonQuery);

  const getLesson = (opts: QueryLazyOptions<QueryLessonArgs>) => {
    setState(LessonState.story);
    query(opts);
  };

  return {
    getLesson,
    lesson: data?.lesson,
    called,
    loading,
    state,
    setState
  };
});
