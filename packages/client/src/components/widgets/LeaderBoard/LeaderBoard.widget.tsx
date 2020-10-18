import React from 'react';
import { LeaderboardContent } from './LeaderBoardContent';
import { LeaderboardNavTab } from './LeaderBoardNavTab';

export const LeaderboardWidget: React.FC<{}> = () =>
  <>
    <LeaderboardNavTab />
    <LeaderboardContent />
  </>;
