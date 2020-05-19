import classnames from 'classnames';
import React from 'react';
import { Size, WithColor } from '../../lib/classes';


export type ButtonProps = WithColor & {
  text?: boolean;
  size?: Size;
};

export const Button: React.FunctionComponent<ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>> = ({
  children,
  className,
  text,
  color,
  size,
  type = 'submit',
  ...props
}) => {
  const classes: any = {};
  if (color) classes[`btn-${color}`] = true;
  if (size) classes[`btn-${size}`] = true;
  if (text) classes['btn-text'] = true;

  // TODO: disabled styles

  // eslint-disable-next-line react/button-has-type
  return <button
    type={type}
    className={classnames('btn', classes, className)}
    {...props}
  >{children}
  </button>;
};
