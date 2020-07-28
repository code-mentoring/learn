import styled, { DefaultTheme } from 'styled-components';

import { Size } from '../../types/styled';
import { theme as t } from '../../css/theme';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number | Size;
  margin?: number | Size;
  shadow?: keyof DefaultTheme['shadows'];
}

export const Box = styled.div<BoxProps>`
  padding:  ${p => t.size(p.padding)};
  margin: ${p => t.size(p.margin)};
  ${p => p.shadow && `box-shadow: ${t.shadows[p.shadow]}`};
`;
Box.defaultProps = { margin: 'none' };
