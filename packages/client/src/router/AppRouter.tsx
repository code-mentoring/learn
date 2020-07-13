import { AuthRoute, UnAuthRoute } from '@codement/ui';
import { history as History } from '@codement/ui/lib/history';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import { ClientContainerWrapper } from '../ClientContainerWrapper';
import { Onboarding } from '../containers/Onboarding.container';
import { DashboardPage } from '../pages/Dashboard/Dashboard.page';
import { LessonPage } from '../pages/Lesson/Lesson.page';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { OnboardingPage } from '../pages/Onboarding/Onboarding.page';
import { routes } from './routes';


export const AppRouter = () => (
  <Router history={History}>
    <Switch>
      <UnAuthRoute routes={routes} path={routes.login(false)} component={LoginPage} />

      <ClientContainerWrapper>
        <AuthRoute routes={routes} path="*">
          <Switch>
            <Route exact path={routes.home(false)} component={DashboardPage} />
            <Route exact path={routes.logout(false)} component={LogoutPage} />
            <Route exact path={routes.lesson(false)} component={LessonPage} />
            <Route path={routes.onboardingWorkflow(false)}>
              <Onboarding.Provider>
                <OnboardingPage />
              </Onboarding.Provider>
            </Route>

            <Redirect to={routes.home(false)} />
          </Switch>
        </AuthRoute>
      </ClientContainerWrapper>
    </Switch>
  </Router>
);
