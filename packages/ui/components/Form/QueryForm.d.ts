import React from 'react';
import { FormProps } from './Form';
export interface MutationFormProps extends FormProps<any> {
    mutation: string;
    variablesKey: string;
}
export interface QueryFormProps extends FormProps<any> {
    query: string;
    variablesKey: string;
}
export declare const MutationForm: React.FunctionComponent<MutationFormProps>;
export declare const QueryForm: React.FunctionComponent<QueryFormProps>;
