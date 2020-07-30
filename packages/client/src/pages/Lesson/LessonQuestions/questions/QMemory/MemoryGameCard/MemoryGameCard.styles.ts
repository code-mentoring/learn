import { Card, Icon, theme as t } from '@codement/ui';
import styled from 'styled-components';

import { MemoryGameCardProps } from './MemoryGameCard';

export const FlipCard = styled.div<MemoryGameCardProps>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  ${p => (p.flipped || p.state) && `
    transform: rotateY(180deg);
  `};
`;

export const CardFront = styled(Card)`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  border-radius: ${t.borderRadius.large};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: all 0.075s;
`;

export const CardBack = styled(CardFront)<{state: MemoryGameCardProps['state']}>`
  transform: rotateY(180deg);

  ${p => p.state === 'incorrect' && `
    border: 2px solid ${t.color('tertiary.500')};
  `};

  ${p => p.state === 'correct' && `
    transform: scale(0.875) rotateY(180deg);
    background: ${t.color('transparent')};
    opacity: 0.2;
    border: 2px solid ${t.color('secondary.400')};
  `};
`;

export const CardContainer = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
  left: 0%;
  top: 0%;
  align-items: center;
  perspective: 1000px;
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: ${t.size('tiny')};
  right: ${t.size('tiny')};
`;
