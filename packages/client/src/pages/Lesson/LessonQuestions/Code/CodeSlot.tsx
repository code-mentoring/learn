/* eslint-disable no-cond-assign, react/no-danger */
import React, { useState } from 'react';
import { cover, Icon, theme, timingBounce } from '@codement/ui';
import { codeColors } from '@codement/ui/css/code';
import styled, { css as CSS, keyframes } from 'styled-components';


export type CodeSlotState = null | 'filled' | boolean;

export interface CodeSlotProps {
  state?: CodeSlotState;
  onDrop: (value: string) => void;
}

const flash = keyframes`
  0% {opacity: 0; }
  100% {opacity: 0.3; }
`;

const bounce = keyframes`
  0% {transform: scale(0%); }
  100% {transform: scale(100%); }
`;


const CodeSlotStyles = styled.span<CodeSlotProps & {dragging?: boolean}>`
  position: relative;
  --color: ${({ state, dragging }) => {
    if (dragging) return theme.color('primary.300');

    switch (state) {
      default:
      case null: // Not selected or graded
        return codeColors.operator;
      case true: // Correct
        return theme.color('secondary');
      case false: // Incorrect
        return theme.color('tertiary');
      case 'filled': // Selected, not graded
        return theme.color('primary.300');
    }
  }};

  &:before {
    ${cover};
    content: '';
    background: var(--color);
    opacity: 0.2;
    ${p => (p.state === null) && CSS`animation: ${flash} 0.5s infinite alternate-reverse forwards`};
  }
  &, &:before {
    border-radius: ${theme.borderRadius.medium};
  }
  border: 2px solid var(--color);
  padding: 0 ${theme.size('tiny')};
  box-shadow: 0 0 0 0 ${codeColors.operator}90;
  transition: box-shadow 0.15s;

  ${Icon} {
    position: absolute;
    top: -${theme.size('xsm')};
    right: -${theme.size('xsm')};
    border-radius: 50%;
    background: ${p => {
    switch (p.state) {
      case true: return theme.color('secondary');
      case false: return theme.color('tertiary');
      default: return theme.color('white');
    }
  }};
    padding: ${theme.size('xtiny')};
    animation: ${bounce} 0.2s ${timingBounce};
  }

  ${p => p.dragging && CSS`
    box-shadow: 0 0 0 10px ${theme.color('primary.100')}90;
  `}
`;


export const CodeSlot: React.FC<CodeSlotProps> = ({
  children,
  state,
  onDrop
 }) => {
  const [dragging, setDragging] = useState(false);

  return <CodeSlotStyles
    state={state}
    onDragOver={e => {
      e.preventDefault();
      setDragging(true);
    }}
    onDragLeave={e => {
      e.preventDefault();
      setDragging(false);
    }}
    // @ts-ignore
    onDrop={(e: DragEvent) => {
      setDragging(false);
      const value = e.dataTransfer!.getData('value');
      onDrop?.(value);
    }}
    dragging={dragging}
  > {children} </CodeSlotStyles>;
};
