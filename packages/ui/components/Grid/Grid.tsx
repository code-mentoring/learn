import classnames from 'classnames';
import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface GridProps extends BoxProps {
  cols?: number;
  className?: string;
}

export const Grid: React.FunctionComponent<GridProps> = ({
  cols,
  className,
  children,
  ...props
  
}) =>
  <Box
    className={classnames('grid', className)}
    style={{ ['--cols' as any]: cols }}
    {...props}
  > {children} </Box>;
