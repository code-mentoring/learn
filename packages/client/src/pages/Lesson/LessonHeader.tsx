import React from 'react';
import { Icon } from '@codement/ui';
import { Route } from 'react-router-dom';
// import { useLocation } from 'react-router';
import { DashboardPage } from '../Dashboard/Dashboard.page';

import LogoMark from '../../images/logo-mark.svg';

export interface LessonHeaderProps {
  pathName: string;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({ pathName }) =>
// TODO: Decide whether to use location.pathname or something else
// TODO: Update Lesson to correct path and component name

  <nav className="flex justify-between items-center p-2 sm:p-4">
    <Route exact path="/" component={DashboardPage}>
      <LogoMark className="logo h-10 sm:ml-10" />
    </Route>
    <h4>{pathName}</h4>
    <div className="sm:mr-10">
      <Route exact path="/lesson" component={Lesson}>
        <Icon className="h-10 text-grey-300" icon="x" />
      </Route>
    </div>
  </nav>;
