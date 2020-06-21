import { useMutation } from '@apollo/react-hooks';
import { Path } from '@codement/api';
import { Button } from '@codement/ui';
import { Modal, ModalProps } from '@codement/ui/components/Modal/Modal';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { PathsList } from '../../components/PathsList/PathsList';


const joinSelectedPaths = gql`
  mutation joinPaths($paths: [String!]!) {
    joinPaths(paths: $paths)
  }
`;

interface ModalJoinPathProps extends ModalProps { }

const BeginButton = styled(Button)`
  margin-top: 32px;
`;

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
    <p className="mb-4">
      Select a path below to begin your journey...
    </p>

    <PathsList onChange={setSelectedPaths} />


    <div className="flex justify-end">
      <BeginButton disabled={!selectedPaths.length} btnType="secondary" onClick={joinPathHandler}>
        Begin
      </BeginButton>
    </div>
  </Modal>;
};
