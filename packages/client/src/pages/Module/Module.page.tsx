import React from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { routes } from '../../router/routes';
import { Path } from '../../containers/Path.container';

export const ModulePage: React.FC<{moduleId: string}> = () => {
  const { moduleId } = useParams();
  const { currentModules } = Path.useContainer();
  const module = currentModules?.find(m => m.id === moduleId);

  if (!module) return <Redirect to={routes.home()} />;

  return <>
    {module.lessons.map((l, i) => <Link key={l.id} to={{ pathname: routes.lesson({ lessonId: l.id }), state: { moduleId: module.id } }}>{`Lesson ${i}`}</Link>)}
  </>;
};
