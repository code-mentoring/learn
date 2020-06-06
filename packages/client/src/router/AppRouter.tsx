import { AuthRoute, UnAuthRoute } from '@codement/ui';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import { ClientContainerWrapper } from '../ClientContainerWrapper';
import { Wizard } from '../containers/Wizard.container';
import { OnboardingPage } from '../pages/Onboarding/Onboarding.page';
import { DashboardPage } from '../pages/Dashboard/Dashboard.page';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { routes } from './routes';
import { LessonRouter } from '../pages/Lesson/LessonRouter';
import { ModulePage } from '../pages/Module/Module.page';


export const AppRouter = () => (
  <Router>
    <Switch>
      <UnAuthRoute routes={routes} path={routes.login(false)} component={LoginPage} />

      <ClientContainerWrapper>
        <AuthRoute routes={routes} path="*">
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
            <Route path={routes.module(false)} component={ModulePage} />
            <Redirect to={routes.home(false)} />
          </Switch>
        </AuthRoute>
      </ClientContainerWrapper>
    </Switch>
  </Router>
);
