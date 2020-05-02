import classnames from 'classnames';
import React from 'react';
import { Size, WithColor } from '../../lib/classes';


export type ButtonProps = WithColor & {
  text?: boolean;
  size?: Size
};

export const Button: React.FunctionComponent<ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>> = ({
  children,
  className,
  text,
  color,
  size,
  ...props
}) => {
  const classes: any = {};
  if (color) classes[`btn-${color}`] = true;
  if (size) classes[`btn-${size}`] = true;
  if (text) classes['btn-text'] = true;

  return <button
    type="button"
    className={classnames('btn', classes, className)}
    {...props}
  >{children}
  </button>;
};
