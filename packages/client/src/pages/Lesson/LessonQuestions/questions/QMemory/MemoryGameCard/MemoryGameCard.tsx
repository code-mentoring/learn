import { CardProps } from '@codement/ui';
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import { CardBack, CardContainer, CardFront, FlipCard, StyledIcon } from './MemoryGameCard.styles';

export interface MemoryGameCardProps extends CardProps {
  value: string;
  flipped?: boolean;
  state?: 'correct' | 'incorrect';
}


export const MemoryGameCard: React.FC<MemoryGameCardProps> = ({
  flipped,
  state,
  value,
  ...props
}) => {
  const code = useRef<any>();

  useEffect(() => {
    if (code.current) Prism.highlightAllUnder(code.current);
  }, [code.current]);

  return <CardContainer ref={code}>
    <FlipCard flipped={flipped} {...props} state={state}>
      <CardFront />
      <CardBack state={state}>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: value }} />
        {state === 'correct'
          && <StyledIcon icon="checkCircle" size="xbig" color="secondary.400" />
        }
      </CardBack>
    </FlipCard>
  </CardContainer>;
};
