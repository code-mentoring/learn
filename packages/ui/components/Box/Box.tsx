import styled from 'styled-components';

import { Size } from '../../types/styled';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number | Size;
  margin?: number;
  shadow?: number;
}

export const Box = styled.div<BoxProps>`
  padding:  ${p => p.theme.size(p.padding)};
  padding:  ${p => p.theme.size(p.margin)};
  box-shadow: ${({ shadow }) => (shadow ? `${shadow}rem` : '2rem')};
`;
