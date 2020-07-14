import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export interface DroppableProps {
  accept: string
  onDrop: (item: any) => void
}

const DroppableItem = styled.div`
  background: #463A89;
  width: ${t.size('massive')};
  height: ${t.size('xbig')};
  border: 2px solid #907cff;
  border-radius: ${t.borderRadius.default};
`;

const Droppable: React.FC<DroppableProps> = ({ accept, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({ isOver: monitor.isOver() })
  });

  return <DroppableItem ref={drop} />;
};

export default Droppable;
