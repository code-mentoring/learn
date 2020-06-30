import { useMutation } from '@apollo/react-hooks';
import { Path, Mutation } from '@codement/api';
import { Button, Text } from '@codement/ui';
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

const Footer = styled.footer`
  text-align: right;
`;

interface ModalJoinPathProps extends ModalProps { }

export const ModalJoinPath: React.FC<ModalJoinPathProps> = ({
  show: showInitial,
  ...modalProps
}) => {

  const [selectedPaths, setSelectedPaths] = useState<Path[]>([]);
  const [joinPaths] = useMutation<Mutation['joinPaths']>(joinSelectedPaths);
  const [show, setShow] = useState(showInitial);

  useEffect(() => setShow(showInitial), [showInitial]);

  const joinPathHandler = async () => {
    await joinPaths({ variables: { paths: selectedPaths.map(p => p.id) } });
    setShow(false);
  };

  return <Modal {...modalProps} show={show} heading="Join a path">
    <Text> Select a path below to begin your journey... </Text>

    <PathsList onChange={setSelectedPaths} />

    <Footer>
      <Button disabled={!selectedPaths.length} color="secondary" onClick={joinPathHandler}>
        Begin
      </Button>
    </Footer>
  </Modal>;
};
