import React from 'react';
import styled from 'styled-components';

import { Size } from '../../types/styled';
import icons from './path-icons/icons';


export type PathIconType = keyof typeof icons;

export interface PathIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  icon: PathIconType;
  size?: Size | number;
}

const BasePathIcon: React.FC<PathIconProps> = ({ icon, ...props }) => {
  const Ikon = icons[icon];
  if (!Ikon) return null;
  return <Ikon {...props} />;
};

export const PathIcon = styled(BasePathIcon)`
  height: ${p => p.theme.size(p.size)};
  width: ${p => p.theme.size(p.size)};
`;
