import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import { IconProps, sizeMap } from '../Icon/Icon';
import icons from './path-icons/icons';

export type PathIcon = keyof typeof icons;

export interface PathIconProps extends Omit<IconProps, 'color' | 'type'> {
  icon: PathIcon;
  className?: string;
}

export const PathIcon = styled<React.FC<PathIconProps>> (({
  icon,
  className,
  size = 'medium',
  height,
  ...props
}:PathIconProps) => {
  const klass = classnames('path-icon', className);
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} className={klass} />;
})`
height:${({ size }) =>`${!size ? sizeMap['medium'] : typeof size === 'number' ? size : sizeMap[size as keyof typeof sizeMap]}rem`};

`;
