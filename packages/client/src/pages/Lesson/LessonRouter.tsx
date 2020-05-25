import React from 'react';
import { useParams, Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loader } from '@codement/ui';
import { Lesson } from '@codement/api';
import { LessonHeader } from './LessonHeader';
import { routes } from '../../router/routes';
import { StorySectionPage } from './StorySection/StorySection.page';

const getLesson = gql`
query lesson($id: String!) {
  lesson(id: $id) {
    id
    moduleId
    module{
      id
      name
      path{
        id
        name
        character{
          id
          name
          displayName
        }
      }
    }
    storySection{
      id
      order
      content
      lessonId
      teachesId
      teaches{
        id
        name
        description
        icon
      }
    }
  }
}`;


export const LessonRouter: React.FC = () => {
  const { lessonId } = useParams();
  const { data, loading } = useQuery<{lesson: Lesson}>(getLesson, { variables: { id: lessonId } });
  const lesson = data?.lesson;
  const moduleName = data?.lesson.module.name;

  if (loading) return <Loader />;
  if (!lessonId || !lesson) return <Redirect to={routes.home()} />;

  return <div className="relative h-screen overflow-hidden bg-white">
    <LessonHeader moduleName={moduleName || ''} />
    <Switch>
      <Route
        path={routes.lesson({ lessonId })}
        component={() => <StorySectionPage lesson={lesson} />}
      />
    </Switch>
  </div>;
};
