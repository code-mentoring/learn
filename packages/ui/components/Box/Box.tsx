import styled from 'styled-components';

import { Size } from '../../types/styled';
import { theme as t } from '../../css/theme';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number | Size;
  margin?: number | Size;
  shadow?: number;
}

export const Box = styled.div<BoxProps>`
  padding:  ${p => t.size(p.padding)};
  margin: ${p => t.size(p.margin)};
  box-shadow: ${({ shadow }) => (shadow ? `${shadow}rem` : '2rem')};
`;
Box.defaultProps = { margin: 'none' };
