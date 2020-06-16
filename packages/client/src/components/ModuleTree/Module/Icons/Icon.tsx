import React, { PropsWithRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { IconFire } from '@codement/ui/components/Icon/icons/solid/cis-fire';
import { IconCheck } from '@codement/ui/components/Icon/icons/solid/cis-check';

import { IconCircle } from './circle';
import { IconHexagon } from './hexagon';
import { IconOctagon } from './octagon';

/* TODO: icon.tsx is modified based on ui/icon.
* If the way to move to style-component method is approved, we can move these to ui/icon.
*/
export const icons = {
  circle: IconCircle,
  hexagon: IconHexagon,
  octagon: IconOctagon,
  fire: IconFire,
  check: IconCheck
};

export type IconType = keyof typeof icons;

// export interface IconProps extends PropsWithRef<any> {
//   icon: IconType;
//   className: string;
//   size: 'large' | 'small' | 'medium' | number;
//   position: string;
//   left:string;
//   top:string;
//   height: string;
//   fill: string;
//   stroke: string;
//   transform: string;
// }

// export const sizeMap = {
//   small: '1',
//   medium: '2.5',
//   large: '5'
// };

// export const ModuleIcon = styled(({
//   icon,
//   ...props
// }:IconProps) => {
//   const Ikon = icons[icon];
//   return <Ikon {...props} />;
// })`
//   position:${({ position }) => position};
//   left:${({ left }) => left};
//   top:${({ top }) => top};
//   height:${({ size }) => `${typeof size === 'number' ? size : sizeMap[size]}rem`};
//   width:auto;
//   fill:${({ fill }) => fill};
//   stroke:${({ stroke }) => stroke};
//   color:${({ color }) => color};
//   stroke-width:2;
//   transform:${({ transform }) => transform};

// `;

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

export const ModuleIcon = styled<React.FC<IconProps>>(({
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
height:${({ size }) => `${!size ? sizeMap.medium : typeof size === 'number' ? size : sizeMap[size]}rem`};
width:auto;
color:${({ color }) => color};
fill:${({ color }) => color};
stroke:${({ stroke }) => stroke};
stroke-width: ${({ stroke, strokeWidth }) => (stroke) && (strokeWidth || 2)};

`;
