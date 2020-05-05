import React from 'react';
import { Page } from '../../components/Page/Page';
// import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { PathModule } from '../../components/PathModule/PathModule';

export const DashboardPage = () => (
  <Page title="Dashboard" type="dashboard" className="bg-white">
    <h1>Dashboard</h1>
    {/* <LeaderboardWidget className="w-64" /> */}
    <PathModule selectedModule = "1" selectedUser = "1" />
  </Page>
);
