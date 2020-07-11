import { Button, Icon, Text, theme as t, centerAbsolute } from '@codement/ui';
import { Modal, ModalProps } from '@codement/ui/components/Modal/Modal';
import LogoMark from '@codement/ui/images/logo-mark.svg';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import { routes } from '../../router/routes';


// const offset: Size = 'lg';
const CloseIcon = styled(Icon)`
`;

const StyledLogo = styled(LogoMark)`
  height: 100%;
  margin-right: auto;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${t.size()} ${t.size('lg')};
`;

const Title = styled(Text)`
  ${centerAbsolute}
  font-weight: ${t.fontWeight.bold};
  color: ${t.color('grey')};
`;

const CloseConfirmModal: React.FC<{ onClose: () => void } & ModalProps> = ({
  onClose,
  ...props
}) => {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to={routes.home()} />;

  return <Modal
    {...props}
    onClose={onClose}
    heading="Are you sure you want to quit?"
    buttons={[
      <Button text color="primary" onClick={onClose}>Cancel</Button>,
      <Button text color="tertiary" onClick={() => setRedirect(true)}>Quit lesson</Button>
    ]}
  >
    <Text>If you quit now, you will lose all your lesson progress!</Text>
  </Modal>;
};

export const LessonHeader: React.FC<{title?: string}> = ({
  title
}) => {
  const [modal, setModal] = useState(false);

  return <Header>
    <StyledLogo />
    {title && <Title as="h2">{title}</Title>}
    <CloseIcon
      icon="x"
      onClick={() => setModal(true)}
      size="lg"
      color="grey.300"
    />
    <CloseConfirmModal
      onClose={() => setModal(false)}
      show={modal}
    />
  </Header>;
};
