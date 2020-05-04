import React from 'react';
// import { Path } from '@code-mentoring/api';
// import { style } from './hexagon.css'
// import ReactDOM from 'react-dom';
import { PathModule } from './PathModule'

// interface PathModuleProps {
//     lesson: string;
//     state: string;
//   };

// const lessonMock = "intro to JS";
// const stateMock =  "completed";


// Interface Props = {
//   lesson: 'Intro to JS',
// }

export const PathModuleMock : React.FunctionComponent = () => {
  return (
    <PathModule lesson = 'Intro to JS'  state = 'completed' />
)
};

// ReactDOM.render(
//     <PathModule />,
//     document.getElementById('pathmodule')
//   );



