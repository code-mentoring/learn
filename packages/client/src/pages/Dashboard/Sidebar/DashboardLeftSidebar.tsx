import React from 'react';
import { Siderbar } from '../../../components/AppSidebar/Sidebar';
import { NeedsPractice } from './NeedsPractice';
import { RecentlyLearned } from './RecentlyLearned';
import { TrainConcepts } from './TrainConcepts';

export const DashboardLeftSidebar: React.FC<{}> = () =>
  <Siderbar>
    <NeedsPractice />
    <TrainConcepts />
    <RecentlyLearned />
  </Siderbar>;
