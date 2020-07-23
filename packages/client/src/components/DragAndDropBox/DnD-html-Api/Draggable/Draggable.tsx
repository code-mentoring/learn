import React, { useState } from 'react';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export interface DraggableProps {
  name: string;
  index: number;
}

type Custom = {
  isDragging: boolean;
  invisible: boolean;
  onDragStart: (evt: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (evt: React.DragEvent<HTMLDivElement>) => void;
};

const DraggableItem = styled.div<Custom>`
  display: ${p => (p.invisible ? 'none' : 'inline-block')};
  opacity: ${p => (p.isDragging ? 0.4 : 1)};
  border: none;
  border-radius: ${t.borderRadius.default};
  background: #0a0041;
  color: #d1d1d4;
  font-family: ${t.fontFamily.code};
  font-size: ${t.size('sm')};
  line-height: 2.1rem;
  padding: 2px ${t.size('tiny')};
  cursor: grab;
  float: left;
`;

const Draggable: React.FC<DraggableProps> = ({ name, index }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [invisible, setInvisible] = useState(false);

  const onDragStart = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.currentTarget!;
    evt.dataTransfer.setData('text', element.getAttribute('data-item')!);
    console.log(element);
    setIsDragging(true);
    setTimeout(() => setInvisible(true), 0);
  };

  const onDragEnd = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.target!;
    console.log(element);
    setIsDragging(false);
  };

  // useEffect(() => {
  //   if (isDragging) {
  //     setTimeout(() => this.classNames('invisible'), 0);
  //   }
  // }, [isDragging]);

  return (
    <DraggableItem key={index} onDragStart={onDragStart} isDragging={isDragging} onDragEnd={onDragEnd} invisible={invisible} data-item={name} draggable>
      {name}
    </DraggableItem>
  );
};

export default Draggable;
