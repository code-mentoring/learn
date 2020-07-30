import React from 'react';

import * as Comps from './Text.styles';
import { Color } from '../../types/styled';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: keyof typeof Comps
  color?: Color
}

export const Text: React.FC<TextProps> = ({ variant = 'body1', ...props }) => {
  const T = Comps[variant];
  if (!T) throw new Error(`Unknown text type '${variant}'`);
  return <T {...props} />;
};
