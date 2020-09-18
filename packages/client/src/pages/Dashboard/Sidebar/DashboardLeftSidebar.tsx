import React from 'react';
import { NeedsPractice } from './NeedsPractice';
import { RecentlyLearned } from './RecentlyLearned';
import { TrainConcepts } from './TrainConcepts';
import { Siderbar } from './DashbaordSideBar.styles';

export const DashboardLeftSidebar: React.FC<{}> = () =>
  <Siderbar>
    <NeedsPractice />
    <TrainConcepts />
    <RecentlyLearned />
  </Siderbar>;
