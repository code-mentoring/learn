import React from 'react';
import styled from 'styled-components';

import { theme as t, CardProps, Card, Icon } from '@codement/ui';

export interface MemoryGameCardProps extends CardProps {
    flipped?: boolean;
    state?: 'correct' | 'incorrect';
    content?: string;
}

const StyledCard = styled(Card)<MemoryGameCardProps>`
  position: relative;
  width: 160px;
  height: 160px;
  left: 0%;
  top: 0%;

  background: ${t.color('white')};
  box-shadow: 0px 2px 10px ${t.color('grey.200')};
  border-radius: ${t.borderRadius.large};

  align-items: center;

  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    text-align: center;
    font-family: Source Code Pro;
    font-weight: ${t.fontWeight.normal};
    font-size: ${t.size('big')};
    line-height: ${t.size('xbig')};
  }

  // there is no corlor as GrayBlue/400, use grey.400 instead
  ${p => p.flipped && `
    color: ${t.color('grey.400')};
  `};

  ${p => p.state === 'incorrect' && `
    border: 2px solid ${t.color('tertiary.500')};
    color: ${t.color('primary.600')};
  `};

  ${p => p.state === 'correct' && `
    width: 140px;
    height: 140px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${t.color('secondary.100')};
    opacity: 0.2;
    border: 2px solid ${t.color('secondary.400')};
    color: ${t.color('primary.600')};
  `};
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 3.32%;
  right: 3.32%;
`;

export const MemoryGameCard: React.FC<MemoryGameCardProps> = ({ flipped, state, content }) =>
  <StyledCard flipped={flipped} state={state}>
    { state === 'correct'
      && <StyledIcon icon="checkCircle" size="xbig" color="secondary.400" />
    }
    { (flipped || state)
      && <span>{content}</span>
    }
  </StyledCard>;
