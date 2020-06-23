import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from '../Box/Box';

export interface GridProps extends BoxProps {
  cols?: number;
  className?: string;
}

export const Grid = styled((props: GridProps) => (
  <Box {...props}> {props.children} </Box>
))`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, minmax(0, 1fr))`};
`;
