// import React from 'react';
// import { useDrag } from 'react-dnd';
// import styled from 'styled-components';
// import { theme as t } from '@codement/ui';

// export interface DraggableProps {
//   name: string
//   type: string
//   isDropped: boolean
// }

// type Custom = {
//   opacity: number
// };

// const DraggableItem = styled.div<Custom>`
//   opacity: ${p => p.opacity};
//   border: "none";
//   border-radius: ${t.borderRadius.default};
//   background: "#0A0041";
//   color: " #D1D1D4";
//   font-family: ${t.fontFamily.code};
//   font-size: ${t.size('sm')};
//   line-height: "2.1rem";
//   padding: ${t.size('tiny')} ${t.size('xl')};
//   cursor: "move";
//   float: "left";
// `;

// const Draggable: React.FC<DraggableProps> = ({ name, type, isDropped }) => {
//   const [{ opacity }, drag] = useDrag({
//     item: { name, type },
//     collect: monitor => ({ opacity: monitor.isDragging() ? 0.4 : 1 })
//   });
//   return (
//     !isDropped ? (
//       <DraggableItem ref={drag} opacity={opacity}>
//         {name}
//       </DraggableItem>
//     ) : null);
// };

// export default Draggable;
