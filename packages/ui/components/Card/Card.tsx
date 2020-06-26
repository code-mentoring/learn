import React from 'react';
import styled from 'styled-components';

import { BoxProps, Box } from '../Box/Box';

export interface CardProps extends BoxProps { }

export const Card = styled(props => <Box {...props} />)`
  border: ${p => p.theme.border.main};
  border-radius: ${p => p.borderRadius.default};
`;
