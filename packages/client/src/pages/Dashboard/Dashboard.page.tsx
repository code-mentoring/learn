import React from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';

export const DashboardPage = () => (
  <Page title="Dashboard" type="dashboard">
    <AppHeader />
    <h1>Dashboard</h1>
    <LeaderboardWidget className="w-64" />
  </Page>
);
