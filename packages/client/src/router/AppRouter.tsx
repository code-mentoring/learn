import { AuthRoute, UnAuthRoute } from '@codement/ui';
import React from 'react';
import {
  Redirect, Route, Router, Switch
} from 'react-router';
import { history as History } from '@codement/ui/lib/history';

import { ClientContainerWrapper } from '../ClientContainerWrapper';
import { Wizard } from '../containers/Wizard.container';
import { OnboardingPage } from '../pages/Onboarding/Onboarding.page';
import { DashboardPage } from '../pages/Dashboard/Dashboard.page';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
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
            <Route path={routes.onboardingWorkflow(false)}>
              <Wizard.Provider>
                <OnboardingPage />
              </Wizard.Provider>
            </Route>

            <Redirect to={routes.home(false)} />
          </Switch>
        </AuthRoute>
      </ClientContainerWrapper>
    </Switch>
  </Router>
);
