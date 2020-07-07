import React from 'react';
import styled from 'styled-components';

import { Color, Size } from '../../types/styled';
import { icons } from './icons';


export type IconType = keyof typeof icons;

export interface IconProps extends React.HTMLAttributes<HTMLOrSVGElement>{
  icon: IconType;
  size?: Size | number;
  color?: Color;
  strokeColor?: Color;
  strokeThickness?: Size;
}

const BaseIcon: React.FC<IconProps> = ({ icon, ...props }) => {
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} />;
};

export const Icon = styled(BaseIcon)`
  height: ${p => p.theme.size(p.size)};
  width: ${p => p.theme.size(p.size)};
  color: ${p => p.theme.color(p.color)};
  stroke: ${p => p.strokeColor ? p.theme.color(p.strokeColor) : p.theme.color('transparent')};
  stroke-width: ${p => p.strokeThickness ? p.theme.size(p.strokeThickness)  : 0};

  path, polygon {
    fill: currentColor;
  }
`;
