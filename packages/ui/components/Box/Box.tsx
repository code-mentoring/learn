import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

export interface BoxProps extends HTMLAttributes<any> {
  padding?: number;
  margin?: number;
  shadow?: number;
  className?: string;
}

export const CBox: React.FunctionComponent<BoxProps> = ({
  className,
  children,
  ...props
}) => <div className={classnames(className)} {...props}>{children}</div>;

export const Box = styled(CBox)`
padding:  ${({ padding }) => (padding ? `${padding}rem` : '2rem')};
margin: ${({ margin }) => (margin ? `${margin}rem` : undefined)};
box-shadow: ${({ shadow }) => (shadow ? `${shadow}rem` : '2rem')};
`;
