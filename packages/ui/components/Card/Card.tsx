import styled from 'styled-components';
import { theme as t } from '../../css/theme';
import { Box, BoxProps } from '../Box/Box';


export interface CardProps extends BoxProps { }

export const Card = styled(Box)`
  position: relative;
  background: ${t.color('white')};
  border-radius: ${t.borderRadius.default};
  box-shadow: ${t.shadows.main};
`;
