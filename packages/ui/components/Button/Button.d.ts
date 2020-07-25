import React, { HTMLAttributes } from 'react';
import { IconType } from '../Icon/Icon';
export declare type ButtonSize = 'small' | 'large';
export declare type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'grey';
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text?: boolean;
    color?: ButtonColor;
    disabled?: boolean;
    size?: ButtonSize;
    icon?: IconType;
    iconPosition?: 'left' | 'right';
    className?: string;
}
export declare const Button: React.FC<ButtonProps>;
