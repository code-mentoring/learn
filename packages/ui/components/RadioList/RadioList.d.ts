import React from 'react';
export interface Options {
    label: string;
    value: any;
    subLabel?: string;
}
export interface RadioListProps {
    name: string;
    className?: string;
    options: Array<Options>;
    value?: any;
    onChange?: (value: any) => void;
}
export declare const RadioList: React.FC<RadioListProps>;
