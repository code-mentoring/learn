import React from 'react';
import { LeaderboardWidget } from '../../../components/widgets/LeaderBoard/LeaderBoard.widget';
import { AdSpace } from './AdSpace';
import { Sidebar } from '../../../components/AppSidebar/Sidebar';
import { SectionHeader } from '../../../components/AppSidebar/SectionHeader';

export const DashboardRightSidebar: React.FC<{}> = () =>
  <Sidebar>
    <SectionHeader noBorder icon="starCircle">
      Leaderboard
    </SectionHeader>
    <LeaderboardWidget />
    {/* TODO: display ad space only if free user */}
    <AdSpace />
  </Sidebar>;
