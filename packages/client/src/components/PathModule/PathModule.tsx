import React from 'react';
import classnames from 'classnames';
import { Hexagon } from './Icons/hexagon';
import { CheckMark } from './Icons/checkMark';
import styles from './PathModule.module.css';

// TODO: mockModule need to be replaced by API query when the Module API is ready
const mockModule = {
  id: 2,
  name: 'Intro to JS',
  completed: true,
  previous: {
    id: 1,
    completed: true
  }
};

export const PathModule : React.FunctionComponent = () => {
  const statusClass = classnames({
    [`${styles.completed}`]: mockModule.completed,
    [`${styles.open}`]: !mockModule.completed && mockModule.previous.completed,
    [`${styles.locked}`]: !mockModule.completed && !mockModule.previous.completed
  });
  return <div className="relative w-24 flex flex-col items-center">
    <Hexagon classname={statusClass} />
    {mockModule.completed
        && <CheckMark classname={`${styles.checkmark}`} />}
    <div className={classnames('name', statusClass)}>
      {mockModule.name}
    </div>
  </div>;
};
