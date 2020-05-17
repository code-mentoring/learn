/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Icon } from '@codement/ui';
import { Modal } from '@codement/ui/components/Modal/Modal';
import React, { useState } from 'react';

import { Path } from '@codement/api';
import { PathsList } from '../../components/PathsList/PathsList';
import styles from './JoinPath.module.css';


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

  const [selectedPaths, setSelectedPaths] = useState<Path[]>([]);


  const beginHandler = () => {
    alert('Clicked Begin in Join a Path');
  };

  return (
    <Modal setShow={setShow}>
      <div className={styles.joinPathCard}>
        <Icon
          icon="x"
          size="small"
          className={styles.closeIcon}
          onClick={() => setShow()}
        />

        <h1 className={styles.modalHeading}>Join a Path</h1>

        <p className={styles.modalInstruction}>
          Select a path below to begin your journey...
        </p>

        <PathsList onChange={setSelectedPaths} />


        <div className="flex justify-end">
          <Button
            color={selectedPaths.length ? 'disabled' : 'success'}
            className="mt-8"
            onClick={beginHandler}
          >
            Begin
          </Button>
        </div>
      </div>
    </Modal>
  );
};
