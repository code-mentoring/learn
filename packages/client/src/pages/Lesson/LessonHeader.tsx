import { Button, Icon, Text, theme as t } from '@codement/ui';
import { Modal, ModalProps } from '@codement/ui/components/Modal/Modal';
import LogoMark from '@codement/ui/images/logo-mark.svg';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { Lesson, LessonState } from '../../containers/Lesson.container';
import { LessonProgress } from '../../components/LessonProgress/LessonProgress';
import { routes } from '../../router/routes';


// const offset: Size = 'lg';
const CloseIcon = styled(Icon)`
`;

const StyledLogo = styled(LogoMark)`
  height: 100%;
`;

const Header = styled.header<{ withProgress: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${t.size()} ${t.size('lg')};

  & > div {
    flex: 1;
    text-align: center;
    div {
      margin: auto;
      margin-top: ${t.size('sm')};
      max-width: 40rem;
    }
  }
`;

const Title = styled(Text)`
  font-weight: ${t.fontWeight.bold};
  color: ${t.color('grey')};
`;


const CloseConfirmModal: React.FC<{ onClose: () => void } & ModalProps> = ({
  onClose,
  ...props
}) => {
  const { resetLesson: reset } = Lesson.useContainer();
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to={routes.home()} />;

  const resetLesson = () => {
    onClose();
    reset();
    setRedirect(true);
  };

  return <Modal
    {...props}
    onClose={onClose}
    heading="Are you sure you want to quit?"
    buttons={[
      <Button text color="primary" onClick={onClose}>Cancel</Button>,
      <Button text color="tertiary" onClick={resetLesson}>Quit lesson</Button>
    ]}
  >
    <Text>If you quit now, you will lose all your lesson progress!</Text>
  </Modal>;
};

export const LessonHeader: React.FC<{ title?: string }> = ({
  title
}) => {
  const [modal, setModal] = useState(false);
  const { progress, lesson, lessonState } = Lesson.useContainer();


  return <Header withProgress={progress !== undefined}>
    <StyledLogo />

    <div>
      {title && <Title as="h2">{title}</Title>}
      {lessonState === LessonState.lesson && <LessonProgress
        current={progress!}
        max={lesson!.lesson.questions.length}
      />}
    </div>

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
