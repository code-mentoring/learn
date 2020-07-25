import React, { HTMLProps, MutableRefObject } from 'react';
import { Color } from '../../types/styled';
import { IconType } from '../Icon/Icon';
export interface TextFieldProps extends Omit<HTMLProps<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
    icon?: IconType;
    iconSecondary?: IconType;
    iconColor?: Color;
    iconSecondaryColor?: Color;
    error?: string | Error;
    suffix?: string;
    forwardRef?: MutableRefObject<HTMLInputElement | null>;
    loading?: boolean;
    initialValue?: string;
    textarea?: boolean;
    size?: 'main' | 'small';
}
export declare const BaseTextField: React.FunctionComponent<TextFieldProps>;
