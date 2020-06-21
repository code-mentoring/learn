import React from 'react';
import styled, { css } from 'styled-components';

import { icons } from './icons';

export type IconType = keyof typeof icons;
export enum IconSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}
export type IconColors = 'primary' | 'secondary' | 'tertiary';

export interface IconProps {
  icon: IconType;
  size?: 'large' | 'small' | 'medium' | number;
  color?: IconColors | string;
}

export const Icon = styled<React.FC<IconProps>>(({
  icon,
  ...props
}) => {
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} />;
})`
  height:${({ size }) => (size === IconSize.small ? '15px' : size === IconSize.large ? '45px' : '30px')};
  width: auto;
  color: ${({ color }) => color};

  ${({ color }) => color && css`
  path, polygon {
    fill: currentColor;
  }
  `}
`;
