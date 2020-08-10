import { ModuleLesson } from '@codement/api';
import { Button, Text, centerAbsolute } from '@codement/ui';
import React from 'react';

import styled from 'styled-components';
import { Lesson, LessonState } from '../../../containers/Lesson.container';
import { LessonFooter, StoryArticle } from '../LessonFooter';
import { Quote } from './Quote';
import { StyledCharacter } from './Story';

const Footer = styled(LessonFooter)`
  justify-content: flex-start;
`;

const BeginButton = styled(Button)`
  ${centerAbsolute}
`;

export interface StoryCompletedProps { lesson: ModuleLesson; }

export const StoryCompleted: React.FC<StoryCompletedProps> = ({ lesson }) => {
  const { beginLesson, setLessonState: setState } = Lesson.useContainer();

  return <>
    <StoryArticle>
      <Quote>
        <Text variant="h2">So to recap…</Text>
        TODO: Story completed / concept summary{lesson.lesson.storySections.length}
      </Quote>
    </StoryArticle>

    <StyledCharacter face="explaining" />

    <Footer>
      <Button
        onClick={() => setState(LessonState.story)}
        color="grey"
        text
        icon="arrowLeft"
      > Go back </Button>

      <BeginButton
        onClick={beginLesson}
        color="secondary"
        icon="arrowRight"
        iconPosition="right"
      >
        Begin lesson
      </BeginButton>
    </Footer>
  </>;
};
