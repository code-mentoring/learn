import { Loader } from '@codement/ui';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';

import { Wizard } from '../containers/Wizard.container';
import { OnboardingPage } from '../pages/Onboarding/Onboarding.page';
import { Auth } from '../containers/Auth.container';
import { Me } from '../containers/Me.container';
import { DashboardPage } from '../pages/Dashboard/Dashboard.page';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { routes } from './routes';
import { LessonRouter } from '../pages/Lesson/LessonRouter';


// if (location.state?.referrer) {
//   return location.state?.referrer;
// }
const getLoginRedirect = () => routes.home();

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
  <Router>
    <Switch>
      <UnAuthRoute path={routes.login(false)} component={LoginPage} />

      <AuthRoute path="*">

        <Switch>
          <Route exact path={routes.home(false)} component={DashboardPage} />
          <Route exact path={routes.logout(false)} component={LogoutPage} />
          <Route path={routes.onboardingWorkflow(false)}>
            <Wizard.Provider>
              <OnboardingPage />
            </Wizard.Provider>
          </Route>
          <Route
            path={routes.lesson(false)}
            component={LessonRouter}
          />

          <Redirect to={routes.home(false)} />
        </Switch>
      </AuthRoute>

    </Switch>
  </Router>
);
