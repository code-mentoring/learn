import { ModuleLesson } from '@codement/api';
import { centerAbsolute, ConfettiGun, Text, theme as t, Button } from '@codement/ui';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { routes } from '../../../router/routes';
import { Module } from '../../../components/ModuleTree/Module/Module';

export interface LessonQuestionsCompletedProps {
  lesson: ModuleLesson;
}

const StyledModule = styled(Module)`
  transform: scale(3);
  margin-bottom: 9rem;
  pointer-events: none;
`;

const Center = styled.div`
  ${centerAbsolute};
  text-align: center;
  h2 {
    /* margin-top: ${t.size()} */
  }
`;

const Buttons = styled.div`
  position: fixed;
  left: 0;
  bottom: ${t.size('xbig')};
  width: 100%;
  text-align: center;
  button:first-child {
    margin-right: ${t.size('xbig')};
  }
`;

export const LessonQuestionsCompleted: React.FC<LessonQuestionsCompletedProps> = ({
  lesson
}) => {
  const { push } = useHistory();
  const { me } = Me.useContainer();
  return <>
    <Center>
      <ConfettiGun />
      <StyledModule
        module={lesson}
        showText={false}
      />
      <Text color="primary.300">Well done {me!.firstName}!</Text>
      <Text variant="h2">You completed {lesson.name}!</Text>

    </Center>
    <Buttons>
      <Button
        size="large"
        text
        color="primary"
        onClick={() => push(routes.home())}
      >Return home</Button>
      <Button size="large" icon="arrowRight" iconPosition="right">Next lesson</Button>
    </Buttons>
  </>;
};
