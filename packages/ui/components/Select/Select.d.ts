import React, { HTMLProps } from 'react';
import { Color } from '../../types/styled';
import { IconType } from '../Icon/Icon';
export interface SelectOption {
    label: string | number;
    value: string | number | undefined;
    selected?: boolean;
    disabled?: boolean;
}
export interface SelectProps extends Partial<HTMLProps<HTMLSelectElement>> {
    options: SelectOption[];
    icon?: IconType;
    iconSecondary?: IconType;
    iconColor?: Color;
    iconSecondaryColor?: Color;
    error?: string | Error;
    onChange?: (event: React.FormEvent<HTMLSelectElement>) => void;
    loading?: boolean;
}
export declare const Select: React.FunctionComponent<SelectProps>;
