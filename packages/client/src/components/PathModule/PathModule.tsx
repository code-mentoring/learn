import React from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
// import { Path } from '@code-mentoring/api';
import  './PathModule.css';
// import ReactDOM from 'react-dom';
import classnames from 'classnames';


  interface PathModuleProps {
      selectedUser : string;
      selectedModule : string;
  }
  // //user -> userPath[] --> path --> module[] --> userModule (completedAt)
  // const pathModuleQuery = gql`query {
  //   pathModule {
  //     name
  //     type
  //     state
  //   }
  // }`;
  
  interface PathModule {
    name : string;
    type : string;
    state : string;
  }

  // const pathModuleMocks: PathModule[] = [
  //   {
  //   name : 'Intro to JS',
  //   type : 'lesson',
  //   state : 'completed'
  //   },
  //   {
  //     name : 'Variables',
  //     type : 'lesson',
  //     state : 'open'
  //     },
  //     {
  //       name : 'Basic Maths',
  //       type : 'lesson',
  //       state : 'locked'
  //       },

  // ]
//mock data  
  const data: PathModule = 
    {
      name : 'Intro to JS',
      type : 'lesson',
      state : 'completed'
    }
    // {
    //   name : 'Variables',
    //   type : 'lesson',
    //   state : 'open'
    // }
    // {
    //   name : 'Basic Maths',
    //   type : 'lesson',
    //   state : 'locked'
    // }

  function getBackgroundStyle(state:string ):string {
   switch(state) {
    case "completed":
      return 'backgroundGreen : true ';
    case "open":
      return 'backgoundBlue : true';
    default:
      return 'backgoundGrey : true';
  }}
  
export const PathModule : React.FunctionComponent<PathModuleProps> = ({selectedModule, selectedUser}) => {
    console.log(selectedModule, selectedUser);
    return <div>{
    // const data = useQuery<{pathModule: PathModule}>(pathModuleQuery);

    // pathModuleMocks.map((data) => 
    // {  
    //   return
        <div>
            <div className={classnames(`hexagonCircle ${getBackgroundStyle(data.state)} ` )}></div>
            {/* <div className={classnames(`checkmark : ${data.state === 'completed'})}`)}></div> */}
            <div className="text-center mb-4" > {data.name}</div>
            <div className="text-center mb-4" > {data.state}</div>
       </div>
    //   }
    // )
  }
  </div> }



