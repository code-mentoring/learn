import React from 'react';
import styled, { css } from 'styled-components';

import { theme as t, CardProps, Card, Icon, centerAbsolute } from '@codement/ui';

export interface MemoryGameCardProps extends CardProps {
    flipped?: boolean;
    state?: 'correct' | 'incorrect';
    content?: string;
}

const relativePosition = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

const styledCard = css`
  border-radius: ${t.borderRadius.large};
`;

const FlipCard = styled.div<MemoryGameCardProps>`
  ${relativePosition};
  transform-style: preserve-3d;
  transition: transform 1s;
  ${p => p.flipped && `
    transform: rotateY(180deg);
  `};
`;

const cardFace = css`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;

  ${styledCard};
`;

const CardFront = styled(Card)`
  ${cardFace};
`;

const CardBack = styled(Card)`
  ${cardFace};
  transform: rotateY(180deg);
`;

const CardContainer = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  left: 0%;
  top: 0%;
  align-items: center;

  perspective: 1000px;

  & span {
    ${centerAbsolute};
    display: flex;
    text-align: center;
    font-family: ${t.fontFamily.code};
    font-weight: ${t.fontWeight.normal};
    font-size: ${t.size('big')};
    line-height: ${t.size('xbig')};
    color: ${t.color('primary.600')};
  }
`;

const StateCard = styled(Card)<MemoryGameCardProps>`
  ${relativePosition};
  ${styledCard};

  ${p => p.state === 'incorrect' && `
    border: 2px solid ${t.color('tertiary.500')};
  `};

  ${p => p.state === 'correct' && `
    transform: scale(0.875);
    background: ${t.color('transparent')};
    opacity: 0.2;
    border: 2px solid ${t.color('secondary.400')};
  `};
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${t.size('tiny')};
  right: ${t.size('tiny')};
`;

export const MemoryGameCard: React.FC<MemoryGameCardProps> = (
  { flipped, state, content, ...props }
) =>
  <CardContainer>
    {
      !state && <FlipCard flipped={flipped} {...props}>
        <CardFront />
        <CardBack>
          <span>{content}</span>
        </CardBack>
      </FlipCard>
    }
    {
      state && <StateCard state={state} {...props}>
        <span>{content}</span>
        {state === 'correct'
      && <StyledIcon icon="checkCircle" size="xbig" color="secondary.400" />}
      </StateCard>
    }
  </CardContainer>;
