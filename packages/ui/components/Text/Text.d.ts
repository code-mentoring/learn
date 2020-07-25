import React from 'react';
import * as Comps from './Text.styles';
import { Color } from '../../types/styled';
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: keyof typeof Comps;
    color?: Color;
}
export declare const Text: React.FC<TextProps>;
