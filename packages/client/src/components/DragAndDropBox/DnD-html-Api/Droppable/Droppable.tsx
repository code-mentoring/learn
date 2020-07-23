import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export interface DroppableProps {
  // answers: [];
  // column: Column;
}

type Custom = {
  filled: boolean;
  hovered: boolean;
}

const DroppableItem = styled.div<Custom>`
  background: #463a89;
  width: ${t.size('massive')};
  height: ${t.size('xbig')};
  border: 2px solid #907cff;
  border-style: ${p => (p.hovered ? 'dashed' : 'solid')};
  border-radius: ${t.borderRadius.default};
`;

const Droppable: React.FC <DroppableProps> = () => {
  const [filled, setFilled] = useState(false);
  const [hover, setHover] = useState(false);
  const dropRef = useRef(null);
  const content: any = [];

  const onDragEnter = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    setHover(true);
  };

  const onDragOver = (evt: React.DragEvent<HTMLDivElement>) => evt.preventDefault();

  const onDragLeave = () => {
    setFilled(false);
    setHover(false);
  };

  const onDrop = (evt: React.DragEvent<HTMLDivElement>) => {
    const element = evt.dataTransfer.getData('text');
    console.log(element);
    content.push(element);
    console.log(content);
  };

  return (
    <DroppableItem
      ref={dropRef}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      filled={filled}
      hovered={hover}
    >
      { content.length === 1 ? <p>{content[0]}</p> : '' }
    </DroppableItem>
  );
};

export default Droppable;
