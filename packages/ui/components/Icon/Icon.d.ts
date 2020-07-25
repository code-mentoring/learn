import React from 'react';
import { Color, Size } from '../../types/styled';
import { icons } from './icons';
export declare type IconType = keyof typeof icons;
export interface IconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    icon: IconType;
    size?: Size | number;
    color?: Color;
}
export declare const Icon: import("styled-components").StyledComponent<React.FC<IconProps>, import("styled-components").DefaultTheme, {}, never>;
