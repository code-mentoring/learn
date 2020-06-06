import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  padding?: number;
  margin?: number;
  shadow?: number;
  className?: string;
}

export const Box = styled.div<BoxProps>`
padding:  ${({ padding }) => (padding ? `${padding}rem` : '2rem')};
margin: ${({ margin }) => (margin ? `${margin}rem` : undefined)};
box-shadow: ${({ shadow }) => (shadow ? `${shadow}rem` : '2rem')};
`;
