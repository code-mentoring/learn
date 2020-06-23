import { Me } from '@codement/ui/lib/containers/Me.container';
import { Loader } from '@codement/ui';
import React from 'react';
import { useHistory } from 'react-router';
import styles from './Dashboard.module.css';
import { ModuleTree } from '../../components/ModuleTree/ModuleTree';

import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { Page } from '../../components/Page/Page';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';
import { routes } from '../../router/routes';
import { Path } from '../../containers/Path.container';


export const DashboardPage = () => {
  const history = useHistory();
  const { me } = Me.useContainer();
  const { loading } = Path.useContainer();

  if (!me?.userPreferences) history.push(routes.onboardingWorkflow());
  if (loading) return <Loader />;
  return <Page title="Dashboard" type="dashboard" className="bg-white">
    <div className={styles.dashboard}>
      <ModuleTree />
      <ProgressWidget className="w-64 my-6 bg-white" />
      <LeaderboardWidget className="w-64" />
    </div>
  </Page>;
};
