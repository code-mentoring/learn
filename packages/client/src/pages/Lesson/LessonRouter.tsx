import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';
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
      module {
        id
        path {
          id
          name
          icon
        }
      }
    }
  }`;


export const LessonRouter: React.FC = () => {
  const { lessonId } = useParams();
  const { data, loading } = useQuery<{lesson: Lesson}>(getLesson, { variables: { id: lessonId } });
  const lesson = data?.lesson;
  const pathName = data?.lesson.module.path.name;
  console.log(data, lessonId);

  if (loading) return <Loader />;

  return <div className="relative h-screen overflow-hidden bg-white">
    <LessonHeader pathName={pathName || ''} />
    <Switch>
      <Route
        path={routes.lesson({ lessonId: parseInt(lessonId!) })}
        component={() => <StorySectionPage lesson={lesson} />}
      />
    </Switch>
  </div>;
};
