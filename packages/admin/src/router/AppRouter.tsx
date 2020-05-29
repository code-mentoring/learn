import { UnAuthRoute, AuthRoute } from '@codement/ui';
import React from 'react';
import {
  Redirect, Route, Router, Switch
} from 'react-router';

import { history as History } from '@codement/ui/lib/history';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { routes } from './routes';
import { AdminsPage } from '../pages/Admin/Admins.page';

export const AppRouter = () => (
  <Router history={History}>
    <Switch>
      <UnAuthRoute routes={routes} path={routes.login(false)} component={LoginPage} />
      <AuthRoute routes={routes} path="*">
        <Switch>
          <Route exact path={routes.admins(false)} component={AdminsPage} />
          {/* <Route exact path={routes.paths(false)} component={PathsPage} />
          <Route exact path={routes.questions(false)} component={QuestionsPage} />
          <Route exact path={routes.settings(false)} component={SettingsPage} /> */}
          <Route exact path={routes.logout(false)} component={LogoutPage} />
          <Redirect to={routes.admins(false)} />
        </Switch>
      </AuthRoute>
    </Switch>
  </Router>
);
