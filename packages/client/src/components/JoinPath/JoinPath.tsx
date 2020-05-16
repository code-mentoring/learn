/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Modal } from '@codement/ui/components/Modal/Modal';
import { Icon, PathIcon, Button } from '@codement/ui';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Path } from '@codement/api';
import icons from '@codement/ui/components/PathIcon/path-icons/icons';

// TODO: Handle selection of paths
// TODO: Disable begin button until path selected

const allPathsQuery = gql`query {
  paths { id name icon }
}`;

interface JoinPath {
  setShow: any;
}

// Click add path button in progress widget to open modal

// TEAM NOTE:
//  - Modal closes when clicked anywhere.  Changed to only close on (x).
//  - Refractor CSS to its own individual file.
//  - Added the fetch paths feature.(create the paths in graphql playground to enable functionality)
//  - Overtiding icon type in PathIcon component using 'as'
//  - I think we should probably make separate css files for the each component rather than 1 in UI
//  - Added the selectPath hook to handle selection of the different paths
//  - I have disabled the begin button until a path is selected
//  - Added hover state for hovering over the paths

// CSS can be found @     ui/css/modal-join-path.css
// Figma Design:          https://www.figma.com/file/eyk5tQgLhIpyiORYfWxeUh/Learning-App?node-id=197%3A0

export const JoinPath: React.FC<JoinPath> = ({ setShow }) => {

  const [selectedPath, setSelectedPath] = useState('');

  const { data } = useQuery<{paths: Path[]}>(allPathsQuery);


  const beginHandler = () => {
    alert('Clicked Begin in Join a Path');
  }

  return (
    <Modal setShow={setShow}>
      <div className="join-path-card">
        <Icon
          icon="x"
          size="small"
          className="btn-close-icon"
          onClick={() => setShow()}
        />

        <h1 className="modal-heading">Join a Path</h1>

        <p className="modal-instruction">
          Select a path below to begin your journey...
        </p>

        <div className="join-path-gridLayout">
          {data?.paths.map(path => (
            <div key={path.id} onClick={() => setSelectedPath(path.name)}>
              <div className={selectedPath === path.name ? 'path-icon-container path-icon-selected' : 'path-icon-container'}>
                <PathIcon
                  icon={path.icon as keyof typeof icons}
                  className="m-auto"
                />
              </div>
              <p className="path-icon-title">{path.name.toUpperCase()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            color={selectedPath === '' ? 'disabled' : 'success'}
            className={selectedPath === '' ? 'mt-8 cursor-not-allowed' : 'mt-8'}
            onClick={beginHandler}
          >
            Begin
          </Button>
        </div>
      </div>
    </Modal>
  );
};
