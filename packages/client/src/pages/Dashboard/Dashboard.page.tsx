import { Loader } from '@codement/ui';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import { useHistory } from 'react-router';

import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { ModuleTree } from '../../components/ModuleTree/ModuleTree';
import { Page } from '../../components/Page/Page';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';
import { Path } from '../../containers/Path.container';
import { routes } from '../../router/routes';
import styles from './Dashboard.module.css';


export const DashboardPage = () => {
  const history = useHistory();
  const { me } = Me.useContainer();
  const { loading } = Path.useContainer();

  if (!me?.userPreferences) history.push(routes.onboardingWorkflow());
  if (loading) return <Loader />;
  return <Page title="Dashboard">
    <div className={styles.dashboard}>
      <ModuleTree />
      <ProgressWidget className="w-64 my-6 bg-white" />
      <LeaderboardWidget className="w-64" />
    </div>
  </Page>;
};
