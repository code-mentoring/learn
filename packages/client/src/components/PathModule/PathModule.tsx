import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import { Path } from '@code-mentoring/api';
import './hexagon.css';
// import ReactDOM from 'react-dom';

interface PathModuleProps {
    lesson: string;
    state: string;
  };

  interface Module {
      name : string;
      type : string;
      state : string;
  }
  //user -> userPath[] --> path --> module[] --> userModule (completedAt)
  const pathModuleQuery = gql`query {
    pathModule {
      name
      type
      state
    }
  }`;

  // query{
  //   getPathModuleById(name:"(pathId : string)")
  //   {
  //     id
  //     name
  //     type
  //     state
  //   }
  // }

// <style>
//   .completed-border {
//     border-color: yellow transparent yellow transparent;  /*top right bottom left*/
//   }
//   .open-border
//   {
//     border-color: blue transparent blue transparent;  /*top right bottom left*/
//   }
// </style>

export const PathModule : React.FunctionComponent<PathModuleProps> = ({lesson,state}) => {
  const { data, loading, error } = useQuery<{ pathModules: Module[] }>(pathModuleQuery);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return(
    <div>
        <div className="border hexagon-circle"></div>
        <div className="text-center mb-4" > {lesson}</div>
        <div className="text-center mb-4" > {state}</div>
    </div>
    )
  }

// ReactDOM.render(
//     <PathModule />,
//     document.getElementById('pathmodule')
//   );



