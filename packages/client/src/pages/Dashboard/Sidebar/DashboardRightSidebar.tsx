import React from 'react';
import { Icon, Text } from '@codement/ui';
import { LeaderboardWidget } from '../../../components/widgets/LeaderBoard/LeaderBoard.widget';
import { SectionHeader, Siderbar } from './DashbaordSideBar.styles';
import { AdSpace } from './AdSpace';

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
