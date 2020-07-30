import { theme as t, Card } from '@codement/ui';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { fadeUp } from '@codement/ui/css/animations';
import { ModuleTree } from '../../components/ModuleTree/ModuleTree';
import { AppPageContent, Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/widgets/LeaderBoard/LeaderBoard.widget';
import { ProgressWidget } from '../../components/widgets/PathProgress/PathProgress.widget';
import { routes } from '../../router/routes';

const Content = styled(AppPageContent)`
  display: grid;
  grid-template-columns: 1fr minmax(20rem, 42rem);
  grid-gap: ${t.size()};

  ${Card} {
    opacity: 0; animation: ${fadeUp} 0.5s ease-out forwards;

    &::nth-child(1) { animation-delay: 0.1s; }
    &::nth-child(2) { animation-delay: 0.4s; }
    &::nth-child(3) { animation-delay: 0.5s; }
  }
`;

const StyledModuleTree = styled(ModuleTree)`grid-row: span 2;`;

export const DashboardPage = () => {
  const { me } = Me.useContainer();

  // TODO: Move to container
  if (!me?.userPreferences) return <Redirect to={routes.onboardingWorkflow()} />;

  return <Page title="Dashboard" header sidebar>
    <Content>
      <StyledModuleTree />
      <ProgressWidget />
      <LeaderboardWidget />
    </Content>
  </Page>;
};
