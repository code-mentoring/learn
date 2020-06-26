import React from 'react';

import * as Comps from './Text.styles';
import { Color } from '../../types/styled';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: keyof typeof Comps
  color?: Color
}

export const Text: React.FC<TextProps> = ({ as = 'body1', ...props }) => {
  const T = Comps[as];
  if (!T) throw new Error(`Unknown text type '${as}'`);
  return <T {...props} />;
};
