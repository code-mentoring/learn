/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Icon } from '@codement/ui';
import { Modal } from '@codement/ui/components/Modal/Modal';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Path } from '@codement/api';
import { PathsList } from '../../components/PathsList/PathsList';
import styles from './JoinPath.module.css';

const joinSelectedPaths = gql`
  mutation joinPaths($paths: [String!]!) {
    joinPaths(paths: $paths)
  }
`;

interface JoinPath {
  setShow: any;
}

// Team Note
// There seems to be no need for the joinPath mutation since selectedPaths
// always returns an array

export const JoinPath: React.FC<JoinPath> = ({ setShow }) => {

  const [selectedPaths, setSelectedPaths] = useState<Path[]>([]);
  const [joinPaths] = useMutation(joinSelectedPaths);


  const joinPathHandler = () => {
    joinPaths({ variables: { paths: selectedPaths } });
    setShow();
    window.location.reload(false);
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
            color={selectedPaths.length ? 'success' : 'disabled'}
            className="mt-8"
            onClick={joinPathHandler}
          >
            Begin
          </Button>
        </div>
      </div>
    </Modal>
  );
};
