import React from 'react';
import styled from 'styled-components';

import { Icon, IconProps } from '../Icon/Icon';
import icons from './path-icons/icons';

export type PathIcon = keyof typeof icons;

export const PathIcon = styled<React.FC<IconProps>>(props => <Icon {...props} />)`
  height: 24px;
`;
