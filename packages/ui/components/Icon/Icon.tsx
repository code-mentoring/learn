import classnames from 'classnames';
import React, { PropsWithRef } from 'react';
import styled from 'styled-components';

import { icons } from './icons';

export type IconType = keyof typeof icons;

export interface IconProps extends PropsWithRef<any> {
  icon: IconType;
  className: string;
  size: 'large' | 'small' | 'medium' | number;
  color: string;
  stroke: string;
  strokeWidth: number;
}

// in rem
export const sizeMap = {
  small: '1',
  medium: '2.5',
  large: '5'
};

export const Icon = styled<React.FC<IconProps>>(({
  icon,
  className,
  size = 'medium',
  color,
  stroke,
  strokeWidth,
  ...props
}:IconProps) => {
  const klass = classnames('icon', icon, className);
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} className={klass} />;
})`
height:${({ size }) =>`${!size ? sizeMap['medium'] : typeof size === 'number' ? size : sizeMap[size]}rem`};
width:auto;
color:${({ color }) => color};
fill:${({ color }) => color};
stroke:${({ stroke }) => stroke};
stroke-width: ${({ stroke, strokeWidth }) => (stroke) && (strokeWidth? strokeWidth : 2)};

`;
