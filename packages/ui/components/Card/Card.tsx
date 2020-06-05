import React from 'react';
import styled from 'styled-components';

import { BoxProps, Box } from '../Box/Box';

export interface CardProps extends BoxProps { }

export const Card = styled(props => <Box {...props} />)`
border: ${props => `2px solid ${props.theme.colors.grey['500']}`};
border-radius: 8px
`;
