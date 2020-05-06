import './PathModule.css';

import React from 'react';
import classnames from 'classnames';
import { Hexagon } from './Icons/hexagon';
import { CheckMark } from './Icons/checkMark';

const mockModule = {
  id: 2,
  name: 'Intro to JS',
  completed: false,
  previous: {
    id: 1,
    completed: true
  }
};

export const PathModule : React.FunctionComponent = () => {
  const statusClass = classnames({
    completed: mockModule.completed,
    open: !mockModule.completed && mockModule.previous.completed,
    locked: !mockModule.completed && !mockModule.previous.completed
  });
  return <div className="relative w-24 flex flex-col items-center">
    <Hexagon classname={statusClass} />
    {mockModule.completed
        && <CheckMark classname="absolute checkmark" />}
    <div className={classnames('name', statusClass)}>
      {mockModule.name}
    </div>
  </div>;
};
