import React from 'react';
import { Redirect } from 'react-router-dom';
import { Me } from '@codement/ui/lib/containers/Me.container';
import { ModuleTree } from '../../components/ModuleTree/ModuleTree';
import { Page } from '../../components/Page/Page';
import { routes } from '../../router/routes';
import { DashboardLeftSidebar } from './Sidebar/DashboardLeftSidebar';
import { DashboardRightSidebar } from './Sidebar/DashboardRightSidebar';

export const DashboardPage = () => {
  const { me } = Me.useContainer();

  // TODO: Move to container
  if (!me?.userPreferences) return <Redirect to={routes.onboardingWorkflow()} />;

  return <Page title="Dashboard" header twoSidebar>
    <DashboardLeftSidebar />
    <ModuleTree />
    <DashboardRightSidebar />
  </Page>;
};
