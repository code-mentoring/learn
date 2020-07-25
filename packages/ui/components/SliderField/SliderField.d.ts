import React from 'react';
export * from './SliderField.styles';
interface SliderFieldProps {
    min?: number;
    max?: number;
    onChange?: (v: number) => void;
    value?: number;
}
export declare const SliderField: React.FunctionComponent<SliderFieldProps>;
