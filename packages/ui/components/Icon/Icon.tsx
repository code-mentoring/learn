import classnames from 'classnames';
import React, { PropsWithRef } from 'react';
import styled from 'styled-components';

import { icons } from './icons';

export type IconType = keyof typeof icons;

export interface IconProps extends PropsWithRef<any> {
  icon: IconType;
  size: 'large' | 'small' | 'medium' | number;
  className: string;
  display: string;
  position: string;
  left:string;
  top:string;
  margin: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  transform: string;
  height: string;
  width: number | 'auto';
  color: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export const sizeMap = {
  small: '1',
  medium: '2.5',
  large: '5'
};

export const Icon = styled<React.FC<IconProps>>(({
  icon,
  className,
  size = 'medium',
  display,
  position,
  left,
  top,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  transform,
  height,
  width = 'auto',
  color,
  fill,
  stroke,
  strokeWidth,
  ...props
}:IconProps) => {
  const klass = classnames('icon', className);
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} className={klass} />;
})`
display:${({ display }) => display};
position:${({ position }) => position};
left:${({ left }) => left};
top:${({ top }) => top};
margin:${({ margin }) => margin && `${margin}rem`};
margin-left:${({ marginLeft }) => marginLeft && `${marginLeft}rem`};
margin-right:${({ marginRight }) => marginRight && `${marginRight}rem`};
margin-top:${({ marginTop }) => marginTop && `${marginTop}rem`};
margin-bottom:${({ marginBottom }) => marginBottom && `${marginBottom}rem`};
transform:${({ transform }) => transform};
height:${({ size }) =>`${!size ? sizeMap['medium'] : typeof size === 'number' ? size : sizeMap[size]}rem`};
width:${({ width }) => typeof width === 'number' ? `${width}rem` : 'auto'};
color:${({ color }) => color};
fill:${({ fill }) => fill};
stroke:${({ stroke }) => stroke};
stroke-width: ${({ stroke, strokeWidth }) => (stroke) && (strokeWidth? strokeWidth : 2)};

`;
