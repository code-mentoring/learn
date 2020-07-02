import styled from 'styled-components';

import { Box, BoxProps } from '../Box/Box';

export interface GridProps extends BoxProps {
  cols?: number;
}

export const Grid = styled(Box)<GridProps>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.cols}, minmax(0, 1fr))`};
`;
