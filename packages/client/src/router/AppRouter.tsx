import { Loader } from '@code-mentoring/ui';
import { Location } from 'history';
import React from 'react';
import { Redirect, Route, RouteProps, Switch, useHistory, Router } from 'react-router';

import { Auth } from '../containers/Auth.container';
import { Me } from '../containers/Me.container';
import { DashboardPage } from '../pages/Dashboard/Dashboard.page';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { routes } from './routes';
import { history } from '../lib/history';


const getLoginRedirect = (_location: Location) => {
  // if (location.state?.referrer) {
  //   return location.state?.referrer;
  // }
  return routes.home();
};

const AuthRoute: React.FunctionComponent<RouteProps> = props => {
  const { status } = Auth.useContainer();
  const history = useHistory();
  const { loading, called } = Me.useContainer();

  if (status === 'signedOut') history.push(routes.login());
  if ((status === 'signingIn' || status === 'verifying') || !called || loading) return <Loader />;

  return <Route {...props} />;
};


const UnAuthRoute: React.FunctionComponent<RouteProps> = props => {
  const { status } = Auth.useContainer();
  const history = useHistory();

  if (status === 'verifying') return <Loader />;
  if (status === 'signedIn') history.push(getLoginRedirect(history.location));
  return <Route {...props} />;
};

export const AppRouter = () => {
  return <Router history={history}>
    <Switch>
      <UnAuthRoute path={routes.login(false)} component={LoginPage} />

      <AuthRoute path="*">
        <Switch>
          <Route exact path={routes.home(false)} component={DashboardPage} />
          <Route exact path={routes.logout(false)} component={LogoutPage} />
          <Redirect to={routes.home(false)} />
        </Switch>
      </AuthRoute>
    </Switch>
  </Router>;
};
