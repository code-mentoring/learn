import React from 'react';
import { TextFieldProps } from '../TextField';
export interface CodeInputRegexProps extends TextFieldProps {
    regex: RegExp;
    minText?: number;
}
export declare const CodeInputRegex: React.FC<CodeInputRegexProps>;
