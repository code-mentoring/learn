import classnames from 'classnames';
import React, { PropsWithRef } from 'react';

import { icons } from './icons';


export type IconType = keyof typeof icons;

export interface IconProps extends PropsWithRef<any> {
  icon: IconType;
  color?: string;
  size?: 'large' | 'small' | 'medium' | number;
}

const sizeMap = {
  small: '4',
  medium: '10',
  large: '20'
}


export const Icon: React.FunctionComponent<IconProps> = ({
  icon,
  color,
  size = 'medium',
  ...props
}) => {
  const colorClass = color ? `text-${color}` : null;

  const sizeClass = `h-${typeof size === 'number' ? size : sizeMap[size]}`

  const klass = classnames('icon', props.className, sizeClass, colorClass);
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} className={klass} />;
};
