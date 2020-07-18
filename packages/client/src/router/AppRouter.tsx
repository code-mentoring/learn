import { AuthRoute, UnAuthRoute } from '@codement/ui';
import { history as History } from '@codement/ui/lib/history';
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';

import { Onboarding } from '../containers/Onboarding.container';
import { ClientContainerWrapper } from '../ClientContainerWrapper';
import { DashboardPage } from '../pages/Dashboard/Dashboard.page';
import { LoginPage } from '../pages/Login/Login.page';
import { LogoutPage } from '../pages/Logout/Logout.page';
import { OnboardingPage } from '../pages/Onboarding/Onboarding.page';
import { routes } from './routes';
import { QuoteLoadingPage } from '../pages/QuoteLoading/QuoteLoading.page';


export const AppRouter = () => (
  <Router history={History}>
    <Switch>
      <UnAuthRoute routes={routes} path={routes.login(false)} component={LoginPage} />

      <ClientContainerWrapper>
        <AuthRoute routes={routes} loadingPage={<QuoteLoadingPage />} path="*">
          <Switch>
            <Route exact path={routes.home(false)} component={DashboardPage} />
            <Route exact path={routes.logout(false)} component={LogoutPage} />
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
