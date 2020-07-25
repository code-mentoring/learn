import React from 'react';
import { Size } from '../../types/styled';
import icons from './path-icons/icons';
export declare type PathIconType = keyof typeof icons;
export interface PathIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    icon: PathIconType;
    size?: Size | number;
}
export declare const PathIcon: import("styled-components").StyledComponent<React.FC<PathIconProps>, import("styled-components").DefaultTheme, {}, never>;
