import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

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
}) =>
  <div className={
    classnames(className, {
      [`p-${padding}`]: padding,
      [`m-${margin}`]: margin,
      [`shadow-${shadow}`]: shadow
    })
  }
    {...props}
  >{children}</div>;
