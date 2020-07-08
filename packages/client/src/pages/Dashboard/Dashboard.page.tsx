import { theme as t } from '@codement/ui';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import { ModuleTree } from '../../components/ModuleTree/ModuleTree';
import { AppPageContent, Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/widgets/LeaderBoard/LeaderBoard.widget';
import { ProgressWidget } from '../../components/widgets/PathProgress/PathProgress.widget';
import { routes } from '../../router/routes';

import { QuestionResult } from '../../components/QuestionResult/QuestionResult';

const Content = styled(AppPageContent)`
  display: grid;
  grid-template-columns: 1fr minmax(20rem, 42rem);
  grid-gap: ${t.size()};
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
      <QuestionResult state="success">
        Lorem ipsum and some other crap text
      </QuestionResult>
    </Content>
  </Page>;
};
