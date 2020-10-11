import React from 'react';
import { Icon, Text } from '@codement/ui';
import { LeaderboardWidget } from '../../../components/widgets/LeaderBoard/LeaderBoard.widget';
import { AdSpace } from './AdSpace';
import { Siderbar } from '../../../components/AppSidebar/Sidebar';
import { SectionHeader } from '../../../components/AppSidebar/SectionHeader';

export const DashboardRightSidebar: React.FC<{}> = () =>
  <Siderbar>
    <SectionHeader noBorder>
      <Icon icon="starCircle" color="grey.400" size="big" />
      <Text color="grey.400" fontWeight="bold" uppercase>Leaderboard</Text>
    </SectionHeader>
    <LeaderboardWidget />
    {/* TODO: display ad space only if free user */}
    <AdSpace />
  </Siderbar>;
