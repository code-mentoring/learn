import React from 'react';
import classnames from 'classnames';

import { IconProps, sizeMap } from '../Icon/Icon';
import icons from './path-icons/icons';

export type PathIcon = keyof typeof icons;

export interface PathIconProps extends Omit<IconProps, 'color' | 'type'> {
  icon: PathIcon;
  className?: string;
}

export const PathIcon: React.FunctionComponent<PathIconProps> = ({
  icon,
  className,
  size = 'medium',
  ...props
}) => {
  const sizeClass = `h-${typeof size === 'number' ? size : sizeMap[size as keyof typeof sizeMap]}`;

  const klass = classnames('path-icon', className, sizeClass);
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} className={klass} />;
};
