import './PathModule.css';

import React from 'react';
import classnames from 'classnames';

const mockModule = {
  id: 2,
  name: 'Intro to JS',
  completed: false,
  previous: {
    id: 1,
    completed: false
  }
};

export const PathModule : React.FunctionComponent = () =>
  <div className="relative">
    <div className="hexagon">
      <svg width="61" height="66" viewBox="0 0 61 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className={classnames({
            completed: mockModule.completed,
            open: !mockModule.completed && mockModule.previous.completed,
            locked: !mockModule.completed && !mockModule.previous.completed
          })}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.5 2.88675C28.594 1.10042 32.406 1.10042 35.5 2.88675L54.0788 13.6132C57.1729 15.3996 59.0788 18.7008 59.0788 22.2735V43.7265C59.0788 47.2992 57.1728 50.6004 54.0788 52.3868L35.5 63.1133C32.406 64.8996 28.594 64.8996 25.5 63.1132L6.92116 52.3867C3.82715 50.6004 1.92116 47.2992 1.92116 43.7265V22.2735C1.92116 18.7008 3.82715 15.3996 6.92116 13.6132L25.5 2.88675Z"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
      { mockModule.completed
        ? <svg className="checkmark" width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 21.5C16.299 21.5 21 16.799 21 11C21 5.20101 16.299 0.5 10.5 0.5C4.70101 0.5 0 5.20101 0 11C0 16.799 4.70101 21.5 10.5 21.5Z"
            fill="#0DD2AB"
          />
          <path
            d="M8.92778 15.7434L4.50586 11.3215L6.43267 9.39472L8.92778 11.8899L14.567 6.25061L16.4938 8.17742L8.92778 15.7434Z"
            fill="white"
          />
        </svg>
        : null}
    </div>
    <div className={classnames('name', {
      completed: mockModule.completed,
      open: !mockModule.completed && mockModule.previous.completed,
      locked: !mockModule.completed && !mockModule.previous.completed
    })}
    >
      {mockModule.name}
    </div>
  </div>;
