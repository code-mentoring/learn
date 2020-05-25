import classnames from 'classnames';
import React from 'react';
import { Size, WithColor } from '../../lib/classes';
import { Icon, IconType } from '../Icon/Icon';
import './button.css';


export type ButtonProps = WithColor & {
  text?: boolean;
  size?: Size;
  iconColor?: string;
  icon?: IconType;
  iconSize?: 'large' | 'small' | 'medium' | number;
  iconSpace?: 'large' | 'small' | 'medium' | number;

};

export const Button: React.FunctionComponent<ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>> = ({
  children,
  className,
  text,
  color,
  size,
  icon,
  iconColor,
  iconSize,
  type = 'submit',
  // iconSize = 8,
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
    className={classnames('btn', classes, className, { 'pl-20': icon })}
    {...props}
  >
    {icon && <Icon
      className="absolute center-vertical left-0"
      icon={icon}
      color={iconColor}
      size={iconSize}
    />}
    {children}
  </button>;
};
