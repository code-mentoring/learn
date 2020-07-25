import React, { HTMLProps } from 'react';
export interface ErrorMessageProps extends HTMLProps<HTMLSpanElement> {
    error: string;
    center?: boolean;
}
export declare const ErrorMessage: React.FC<ErrorMessageProps>;
