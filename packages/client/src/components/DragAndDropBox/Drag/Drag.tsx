import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export interface DraggableProps {
  name: string;
  index: number;
}

type Custom = {
  isDragging: boolean
};

const DraggableItem = styled.div<Custom>`
  opacity: ${p => (p.isDragging ? 0.4 : 1)};
  border: none;
  border-radius: ${t.borderRadius.default};
  background: #0A0041;
  color: #D1D1D4;
  font-family: ${t.fontFamily.code};
  font-size: ${t.size('sm')};
  line-height: 2.1rem;
  padding: 2px ${t.size('tiny')};
  cursor: move;
  float: left;
`;

const Drag: React.FC<DraggableProps> = ({ name, index }) => {
  console.log(name);

  return (
    <Draggable
      key={name}
      draggableId={name}
      index={index}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) =>
        <DraggableItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {name}
        </DraggableItem>
      }
    </Draggable>
  );
};

export default Drag;
