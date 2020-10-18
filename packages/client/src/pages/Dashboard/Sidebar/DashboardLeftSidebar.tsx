import React from 'react';
import { Sidebar } from '../../../components/AppSidebar/Sidebar';
import { NeedsPractice } from './NeedsPractice';
import { RecentlyLearned } from './RecentlyLearned';
import { TrainConcepts } from './TrainConcepts';

export const DashboardLeftSidebar: React.FC<{}> = () =>
  <Sidebar>
    <NeedsPractice />
    <TrainConcepts />
    <RecentlyLearned />
  </Sidebar>;
