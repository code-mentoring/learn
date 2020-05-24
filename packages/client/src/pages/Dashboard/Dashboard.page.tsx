import React from 'react';
import { useHistory } from 'react-router';
import gql from 'graphql-tag';
import { Path } from '@codement/api';

import { useQuery } from '@apollo/react-hooks';
import { Button } from '@codement/ui';
import { Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';
import { routes } from '../../router/routes';
import { Me } from '../../containers/Me.container';

const getPaths = gql`
query paths {
  paths {
    id
    name
    icon
    description
    modules {
      id
      name
      lessons {
        id
      }
    }
  }
}`;

export const DashboardPage = () => {
  const history = useHistory();
  const { me } = Me.useContainer();
  const { data } = useQuery<{paths: Path[]}>(getPaths);
  const lesson = data?.paths[0].modules[0].lessons[0];

  if (!me?.userPreferences) history.push(routes.onboardingWorkflow());
  return <Page title="Dashboard" type="dashboard" className="bg-white">
    <h1>Dashboard</h1>
    <ProgressWidget className="w-64 my-6 bg-white" />
    <LeaderboardWidget className="w-64" />
    <Button type="button" onClick={() => history.push(routes.lesson({ lessonId: lesson.id }))}>Go to lesson</Button>
  </Page>;

};
