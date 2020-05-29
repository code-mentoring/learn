import { Loader } from '@codement/ui';
import React from 'react';
import {
  Redirect, Route, RouteProps, Router, Switch, useHistory
} from 'react-router';

import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { Me } from '@codement/ui/lib/containers/Me.container';
import { history as History } from '@codement/ui/lib/history';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { routes } from './routes';
import { AdminsPage } from '../pages/Admin/Admins.page';


// if (location.state?.referrer) {
//   return location.state?.referrer;
// }
const getLoginRedirect = () => routes.admins();

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
  if (status === 'signedIn') history.push(getLoginRedirect());
  return <Route {...props} />;
};

export const AppRouter = () => (
  <Router history={History}>
    <Switch>
      <UnAuthRoute path={routes.login(false)} component={LoginPage} />
      <AuthRoute path="*">
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
