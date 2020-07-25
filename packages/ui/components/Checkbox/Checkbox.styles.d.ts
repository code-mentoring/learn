import React, { HTMLProps } from 'react';
export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
    text?: string;
    indeterminate?: boolean;
}
export interface InputProps extends CheckboxProps {
    type?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    checked?: boolean;
    defaultChecked?: boolean;
}
export interface SpanProps extends InputProps {
}
export declare const CheckboxDiv: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, CheckboxProps, never>;
export declare const CheckboxInput: import("styled-components").StyledComponent<"input", import("styled-components").DefaultTheme, InputProps, never>;
export declare const CheckboxIconContainer: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, SpanProps, never>;
