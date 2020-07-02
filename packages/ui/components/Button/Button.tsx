import { Icon } from '@codement/ui';
import React, { HTMLAttributes } from 'react';

import { IconType } from '../Icon/Icon';
import { StyledButton } from './Button.styles';


export type ButtonSize = 'small' | 'large';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary';


export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: boolean;
  color?: ButtonColor
  disabled?: boolean;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: 'left' | 'right'
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = 'left',
  children,
  color = 'primary',
  ...props
}) =>
  <StyledButton color={color} {...props}>
    {icon && iconPosition === 'left' && <Icon icon={icon} className="left" />}
    <span>{children}</span>
    {icon && iconPosition === 'right' && <Icon icon={icon} className="right" />}
  </StyledButton>;
