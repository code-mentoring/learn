import React, { useState } from 'react';
import { useParams, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Loader } from '@codement/ui';

import { Path } from '../../containers/Path.container';
import { LessonHeader } from './LessonHeader';
import { routes } from '../../router/routes';
import { StorySectionPage } from './StorySection/StorySection.page';
import { LessonPage } from './Lesson.page';

export const LessonRouter: React.FC = () => {
  const { lessonId } = useParams();
  const [skipped, setSkipped] = useState(false);
  const { state } = useLocation<{moduleId: string}>();
  const { currentModules, loading } = Path.useContainer();
  const currentModule = currentModules?.find(cm => cm.id === state.moduleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === lessonId);
  const moduleName = currentModule?.name;

  if (loading) return <Loader />;
  if (!lessonId || !currentLesson) return <Redirect to={routes.home()} />;

  return <div className="relative h-screen overflow-hidden bg-white">
    <LessonHeader moduleName={moduleName || ''} />
    <Switch>
      <Route
        path={routes.lesson({ lessonId })}
        component={() => (skipped
          ? <LessonPage lesson={currentLesson} />
          : <StorySectionPage lesson={currentLesson} setSkipped={setSkipped} />)}
      />
    </Switch>
  </div>;
};
