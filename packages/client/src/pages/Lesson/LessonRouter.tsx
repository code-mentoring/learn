import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';

import { LessonHeader } from './LessonHeader';
import { routes } from '../../router/routes';
import { StorySectionPage } from './StorySection/StorySection.page';

export const LessonRouter: React.FC = () => {
  const { lessonId } = useParams();
  return <div className="relative h-screen overflow-hidden bg-white">
    <LessonHeader pathName="Intro to HTML" />
    <Switch>
      <Route path={routes.lesson({ lessonId: parseInt(lessonId!) })} component={StorySectionPage} />
    </Switch>
  </div>;
};
