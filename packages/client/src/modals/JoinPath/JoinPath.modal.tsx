import { useMutation } from '@apollo/react-hooks';
import { Path } from '@codement/api';
import { Button } from '@codement/ui';
import { Modal, ModalProps } from '@codement/ui/components/Modal/Modal';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { PathsList } from '../../components/PathsList/PathsList';

const Styledp = styled.p`
margin-bottom: 1rem;
`;

const joinSelectedPaths = gql`
  mutation joinPaths($paths: [String!]!) {
    joinPaths(paths: $paths)
  }
`;

interface ModalJoinPathProps extends ModalProps { }

export const ModalJoinPath: React.FC<ModalJoinPathProps> = ({
  show: showInitial,
  ...modalProps
}) => {

  const [selectedPaths, setSelectedPaths] = useState<Path[]>([]);
  const [joinPaths] = useMutation(joinSelectedPaths);
  const [show, setShow] = useState(showInitial);

  useEffect(() => setShow(showInitial), [showInitial]);

  const joinPathHandler = async () => {
    await joinPaths({ variables: { paths: selectedPaths } });
    setShow(false);
  };

  return <Modal {...modalProps} show={show} heading="Join a path">
    <Styledp>
      Select a path below to begin your journey...
    </Styledp>

    <PathsList onChange={setSelectedPaths} />


    <div className="flex justify-end">
      <Button
        disabled={!selectedPaths.length}
        color="success"
        className="mt-8"
        onClick={joinPathHandler}
      >
        Begin
      </Button>
    </div>
  </Modal>;
};
