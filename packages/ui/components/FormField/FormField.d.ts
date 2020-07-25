import React, { FunctionComponent } from 'react';
import { CheckboxProps } from '../Checkbox/Checkbox.styles';
import { TextFieldProps } from '..';
export declare type FormFieldType = ({
    type: 'text' | 'password' | 'number';
} & TextFieldProps) | ({
    type: 'checkbox';
} & CheckboxProps);
export declare type FormFieldBaseProps = {
    name: string;
    label?: string;
    labelComponent?: React.ComponentType<any>;
    className?: string;
    colSpan?: 1 | 2;
    changeOnBlur?: boolean;
    render?: (type: string, options: FormFieldCustomProps) => [React.FC<any>, {
        [key: string]: any;
    }] | undefined;
};
export declare type FormFieldProps<T = {
    type: string;
}> = FormFieldBaseProps & (FormFieldType | T | {
    component?: React.ComponentType | FunctionComponent<any>;
    [prop: string]: any;
});
export interface FormFieldCustomProps {
    onChange: (v: any) => void;
}
export declare const BaseFormField: React.FunctionComponent<FormFieldProps>;
export declare const FormField: React.FC<FormFieldProps>;
