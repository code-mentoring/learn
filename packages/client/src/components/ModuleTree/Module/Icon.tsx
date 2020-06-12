import React, { PropsWithRef } from 'react';
import styled from 'styled-components';

import { Circle } from './circle';
import { Hexagon } from './hexagon';
import { Octagon } from './octagon';

/* TODO: IconFire and IconCheck is temperary copy from ui/icon.
 * If the way to move to style-component method is approved, we can move these to ui/icon.
*/
import { IconFire } from './cis-fire';
import { IconCheck } from './cis-check';

/* TODO: icon.tsx is modified based on ui/icon.
* If the way to move to style-component method is approved, we can move these to ui/icon.
*/
export const icons = {
  circle: Circle,
  hexagon: Hexagon,
  octagon: Octagon,
  fire: IconFire,
  check: IconCheck
};

export type IconType = keyof typeof icons;

export interface IconProps extends PropsWithRef<any> {
  icon: IconType;
  className: string;
  size: 'large' | 'small' | 'medium' | number;
  position: string;
  left:string;
  top:string;
  height: string;
  fill: string;
  stroke: string;
  transform: string;
}

export const sizeMap = {
  small: '1',
  medium: '2.5',
  large: '5'
};

export const Icon: React.FunctionComponent<IconProps> = ({
  icon,
  color,
  size,
  position,
  left,
  top,
  height,
  width,
  fill,
  stroke,
  transform,
  ...props
}) => {
  const Ikon = icons[icon];
  return <Ikon {...props} />;
};

export const ModuleIcon = styled(Icon)<IconProps>`
  position:${({ position }) => position};
  left:${({ left }) => left};
  top:${({ top }) => top};
  height:${({ size }) => `${typeof size === 'number' ? size : sizeMap[size]}rem`};
  width:auto;
  fill:${({ fill }) => fill};
  stroke:${({ stroke }) => stroke};
  color:${({ color }) => color};
  stroke-width:2;
  transform:${({ transform }) => transform};

`;
