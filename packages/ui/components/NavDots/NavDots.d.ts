import React from 'react';
export interface NavDotsProps extends Omit<React.HTMLProps<HTMLElement>, 'onChange'> {
    value?: number;
    steps: boolean[];
    onChange?: (page: number) => void;
}
export declare const NavDots: React.FC<NavDotsProps>;
