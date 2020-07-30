import { ModuleLesson } from '@codement/api';
import { Button, centerAbsolute, NavDots, theme as t, CharacterHTML, CharacterProps } from '@codement/ui';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import { Lesson, LessonState } from '../../../containers/Lesson.container';
import { LessonFooter, StoryArticle } from '../LessonFooter';
import { StoryContent } from './StoryContent';

export interface StoryProps {
  lesson: ModuleLesson;
  completed?: boolean;
}

const StyledNavDots = styled(NavDots)`
  ${centerAbsolute}
`;

const SkipButton = styled(Button)`
  position: absolute;
  top: -${t.size('big')};
  transform: translateY(-100%);
  right: ${t.size('huge')};
  background: ${t.color('white')};
`;

export const StyledCharacter = styled(CharacterHTML)`
  position: absolute;
  bottom: ${t.size('giant')};
  left: 50%;
  margin-left: -30rem;
  transform: translateX(-100%);
`;


export const Story: React.FC<StoryProps> = ({
  lesson
}) => {
  const { me } = Me.useContainer();
  const { setLessonState: setState } = Lesson.useContainer();
  const steps = lesson.lesson.storySections;

  const [page, setPage] = useState(0);
  const step = useMemo(() => steps[page], [steps, page]);

  const goTo = (p: number) => {
    // Submit on last page
    if (p === lesson.lesson.storySections.length) {
      setState(LessonState.storyCompleted);
    } else setPage(p);
  };

  const faces: CharacterProps['face'][] = [
    'smileBig',
    'cute',
    'explaining',
    'calm',
    'contempt'
  ];
  const face = useMemo(() => faces[page % faces.length], [page]);

  return <>
    <StoryArticle>
      <StoryContent text={step.content} obj={me!} key={page} />
    </StoryArticle>

    <StyledCharacter face={face} />

    <LessonFooter>
      <StyledNavDots
        steps={new Array(steps.length).fill(true)}
        value={page}
        onChange={setPage}
      />
      <Button
        text
        size="large"
        icon="arrowRight"
        iconPosition="right"
        onClick={() => goTo(page + 1)}
      >
        Next
      </Button>
      <SkipButton
        text
        icon="mediaSkipForward"
        onClick={() => setState(LessonState.storyCompleted)}
        color="grey"
      > Skip story </SkipButton>
    </LessonFooter>
  </>;
};
