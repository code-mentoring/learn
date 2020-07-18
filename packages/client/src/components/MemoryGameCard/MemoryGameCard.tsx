import { CardProps } from '@codement/ui';
import React from 'react';
import { CardBack, CardContainer, CardFront, FlipCard, StyledIcon } from './MemoryGameCard.styles';


export interface MemoryGameCardProps extends CardProps {
  flipped?: boolean;
  state?: 'correct' | 'incorrect';
}


export const MemoryGameCard: React.FC<MemoryGameCardProps> = ({
  flipped,
  state,
  children,
  ...props
}) =>
  <CardContainer>
    <FlipCard flipped={flipped} {...props} state={state}>
      <CardFront />
      <CardBack state={state}>
        {children}
        {state === 'correct'
          && <StyledIcon icon="checkCircle" size="xbig" color="secondary.400" />
        }
      </CardBack>
    </FlipCard>
  </CardContainer>;
