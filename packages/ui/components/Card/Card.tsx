import classnames from 'classnames';
import React from 'react';

import { Box, BoxProps } from '../Box/Box';


export interface CardProps extends BoxProps { }

export const Card: React.FC<CardProps> = ({ className, ...props }) =>
  <Box
    padding={2}
    shadow={2}
    className={classnames('card rounded border-2 border-grey-500', className)}
    {...props}
  />;
