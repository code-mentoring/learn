import React from 'react';
import { useHistory } from 'react-router';

import { Me } from '@codement/ui/lib/containers/Me.container';
import { Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';
import { routes } from '../../router/routes';


export const DashboardPage = () => {
  const history = useHistory();
  const { me } = Me.useContainer();


  if (!me?.userPreferences) history.push(routes.onboardingWorkflow());
  return <Page title="Dashboard" type="dashboard" className="bg-white">
    <h1>Dashboard</h1>
    <ProgressWidget className="w-64 my-6 bg-white" />
    <LeaderboardWidget className="w-64" />
  </Page>;

};
