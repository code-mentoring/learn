import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';
import { routes } from '../../router/routes';
import { Me } from '../../containers/Me.container';
import { JoinPath } from '../../components/JoinPath/JoinPath';

export const DashboardPage = () => {

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => setShowModal(!showModal);
  const history = useHistory();
  const { me } = Me.useContainer();


  if (!me?.userPreferences) history.push(routes.onboardingWorkflow());
  return <Page title="Dashboard" type="dashboard" className="bg-white">
    <h1>Dashboard</h1>
    <ProgressWidget setShow={setShowModal} className="w-64 my-6 bg-white" />
    <LeaderboardWidget className="w-64" />
    {showModal ? <JoinPath setShow={showModalHandler} /> : null}
  </Page>;
};
