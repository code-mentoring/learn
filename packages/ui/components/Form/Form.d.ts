import { FormikConfig, FormikContextType } from 'formik';
import React, { PropsWithoutRef } from 'react';
export interface FormProps<Values extends object> extends Partial<FormikConfig<Values>>, PropsWithoutRef<HTMLFormElement> {
    onChange?: (values: Values, formikHelpers: FormikContextType<Values>) => void;
    setForm?(form: FormikContextType<Values>): void;
    error?: string;
    success?: string;
}
export interface BrixFormContext {
    onChange: (values: any, formik: FormikContextType<any>) => any;
}
export declare const useBrixFormContext: () => BrixFormContext;
export declare const Form: React.FunctionComponent<FormProps<any>>;
