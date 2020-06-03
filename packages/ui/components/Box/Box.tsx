import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

export interface BoxProps extends HTMLAttributes<any> {
  padding?: number;
  margin?: number;
  shadow?: number;
  className?: string;
}

export const Box: React.FunctionComponent<BoxProps> = ({
  padding,
  margin,
  shadow,
  className,
  children,
  ...props
}) => {

  const BoxDiv = styled.div`
    padding: ${padding}rem;
    margin: ${margin}rem;
    box-shadow: ${shadow}rem;
  `;

  return <BoxDiv className={classnames(className)} {...props}>{children}</BoxDiv>;
};
