import React from 'react';
import { Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';

export const DashboardPage = () => (
  <Page title="Dashboard" type="dashboard" className="bg-white">
    <h1>Dashboard</h1>
    <LeaderboardWidget className="w-64" />
  </Page>
);
