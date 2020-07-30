import { Card, theme as t } from '@codement/ui';
import React from 'react';
import styled from 'styled-components';

export interface DragAnswer {
  value: string;
  onDrop?: () => void;
  used?: boolean;
}

const Box = styled.div`
  display: inline-block;
  background: ${t.color('grey.200')};
  border-radius: ${t.borderRadius.default};
  box-shadow: inset ${t.shadows.main};
  margin: ${t.size('tiny')};
`;

const Draggable = styled(Card)<{used?: boolean}>`
  cursor: grab;
  user-select: none;

  &:hover { background-color: ${t.color('primary.100')} };
  &.hide { transform: translate(99999999px); }

  ${p => p.used && 'opacity: 0; pointer-events: none;'}
`;

export const DragAnswer: React.FC<DragAnswer> = ({
  value,
  onDrop,
  used
}) =>
  <Box>
    <Draggable
      onDragStart={e => {
        const ele = e.target as HTMLElement;
        e.dataTransfer.setData('value', value);
        requestAnimationFrame(() => {
          ele.classList.add('hide');
        });
      }}
      onDragEnd={e => {
        const element = e.target as HTMLElement;
        if (e.dataTransfer.dropEffect === 'move') onDrop?.();
        element.classList.remove('hide');
      }}
      draggable
      used={used}
    >{value}</Draggable>
  </Box>;
