import React, { PropsWithRef } from 'react';
import styled, { css } from 'styled-components';

import { icons } from './icons';
import { theme } from '../../css/theme';

export type IconType = keyof typeof icons;

export interface IconProps extends PropsWithRef<any> {
  icon: IconType;
  size?: keyof typeof theme.iconSizes;
  color: keyof typeof theme.colors;
  stroke: string;
  strokeWidth: string;
}

export const Icon = styled<React.FC<IconProps>>(({
  icon,
  color,
  stroke,
  strokeWidth,
  ...props
}) => {
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} />;
})`
  height: ${({ size, theme }) => size ? theme.iconSizes[size] : theme.iconSizes['medium']};
  width: auto;
  color: ${({ color }) => color};
  stroke:${({ stroke }) => stroke};
  stroke-width: ${({ stroke, strokeWidth }) => (stroke) && (strokeWidth || '2')};

  ${({ color }) => color && css`
  path, polygon {
    fill: currentColor;
  }
  `}
`;
