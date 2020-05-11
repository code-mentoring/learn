import React, { useState } from 'react';
import { Page } from '../../components/Page/Page';
import { LeaderboardWidget } from '../../components/LeaderBoardWidget/LeaderBoardWidget';
import { ProgressWidget } from '../../components/ProgressWidget/ProgressWidget';
import { JoinPath } from '../../components/JoinPath/JoinPath';

export const DashboardPage = () => {

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = ( ) => setShowModal( !showModal );

  return (
    <Page title="Dashboard" type="dashboard" className="bg-white">
      <h1>Dashboard</h1>
      <ProgressWidget setShow={setShowModal} className="w-64 my-6 bg-white" />
      <LeaderboardWidget className="w-64" />
      {showModal ? <JoinPath setShow={showModalHandler} /> : null}
    </Page>
  );
};
