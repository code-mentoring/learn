import React from 'react';
import {
  Droppable,
  DroppableProvided
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';
import Drag from '../Drag/Drag';
import { Column, Answer } from '../data';

export interface DroppableProps {
  answers: Answer[];
  column: Column;
}

const DroppableItem = styled(Droppable)`
  background: #463a89;
  width: ${t.size('massive')};
  height: ${t.size('xbig')};
  border: 2px solid #907cff;
  border-radius: ${t.borderRadius.default};
`;

const Drop: React.FC<DroppableProps> = ({ answers, column }) => (
  <DroppableItem droppableId={column.id}>
    {(provided: DroppableProvided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {answers.map((answer, index) =>
          <Drag key={answer.id} name={answer.content} index={index}>
            {provided.placeholder}
          </Drag>)}
      </div>
    )}
  </DroppableItem>
);

export default Drop;
