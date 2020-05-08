import React from 'react';
import { Page } from '../../components/Page/Page';
<<<<<<< HEAD
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';

export const DashboardPage = () => (
  <Page title="Dashboard" type="dashboard" className="bg-white">
    <h1>Dashboard</h1>
    <ProgressWidget className="w-64 my-6 bg-white" />
    <LeaderboardWidget className="w-64" />
=======
// import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { JoinPathPage } from '../JoinPath/JoinPath.page';

export const DashboardPage = () => (
  <Page title="Dashboard" type="dashboard" className="bg-white">
    {/* <h1>Dashboard</h1> */}
    {/* <LeaderboardWidget className="w-64" /> */}
    <JoinPathPage />
>>>>>>> feat: adding the modal join path
  </Page>
);
