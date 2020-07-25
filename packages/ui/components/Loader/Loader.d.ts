import React from 'react';
import { Color, Size } from '../../types/styled';
export interface LoaderProps {
    size?: Size;
    color?: Color;
    center?: boolean;
    partyMode?: boolean;
}
export declare const Loader: React.FC<LoaderProps>;
