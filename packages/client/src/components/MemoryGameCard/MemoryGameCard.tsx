import React from 'react';
import styled from 'styled-components';

import { theme as t, CardProps, Card, Icon, centerAbsolute } from '@codement/ui';

export interface MemoryGameCardProps extends CardProps {
    flipped?: boolean;
    state?: 'correct' | 'incorrect';
    content?: string;
}

const StyledCard = styled(Card)<MemoryGameCardProps>`
  position: relative;
  width: 16rem;
  height: 16rem;
  left: 0%;
  top: 0%;

  border-radius: ${t.borderRadius.large};
  
  align-items: center;

  & > span {
    ${centerAbsolute};
    display: flex;
    text-align: center;
    font-family: ${t.fontFamily.code};
    font-weight: ${t.fontWeight.normal};
    font-size: ${t.size('big')};
    line-height: ${t.size('xbig')};
    color: ${t.color('primary.600')};
  }

  ${p => p.state === 'incorrect' && `
    border: 2px solid ${t.color('tertiary.500')};
  `};

  ${p => p.state === 'correct' && `
    transform: scale(0.875);
    background: ${t.color('secondary.100')};
    opacity: 0.2;
    border: 2px solid ${t.color('secondary.400')};
  `};
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${t.size('tiny')};
  right: ${t.size('tiny')};
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
