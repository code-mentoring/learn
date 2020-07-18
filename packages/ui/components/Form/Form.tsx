import classnames from 'classnames';
import { FormikConfig, FormikContextType, FormikProvider, useFormik } from 'formik';
import React, { PropsWithoutRef, useEffect } from 'react';

import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { StyledForm } from './Form.styles';


export interface FormProps<Values extends object> extends
  Partial<FormikConfig<Values>>,
  PropsWithoutRef<HTMLFormElement> {
  onChange?: (values: Values, formikHelpers: FormikContextType<Values>) => void;
  setForm?(form: FormikContextType<Values>): void;
  error?: string;
  success?: string;
}


// Brix Form context and hooks
export interface BrixFormContext {
  onChange: (values: any, formik: FormikContextType<any>) => any;
}
const BrixFormContext = React.createContext<BrixFormContext>({} as any);
export const useBrixFormContext = () => React.useContext<BrixFormContext>(BrixFormContext);

export const Form: React.FunctionComponent<FormProps<any>> = ({
  onChange,
  children,
  className,
  onSubmit = () => {}, // eslint-disable-line no-empty-function
  initialValues = {},
  style,
  setForm,
  error,
  // success,
  ...formikProps
}) => {

  // Establishes the context for FormField to call onChange
  const ctx: BrixFormContext = {
    onChange: (e, formik) => {
      if (onChange) onChange(e, formik);
    }
  };

  const form = useFormik({
    onSubmit,
    initialValues,
    enableReinitialize: true,
    ...formikProps
  });

  useEffect(() => {
    if (setForm) setForm(form);
  }, [form.values, form.errors, form.touched]);

  useEffect(() => {
    // TODO: Fix formik initial change
    if (onChange && Object.keys(initialValues).length) onChange(initialValues, {} as any);
  }, [initialValues]);

  const valid = form.dirty && form.isValid;

  return <BrixFormContext.Provider value={ctx}>
    <FormikProvider value={form}>
      {error && <ErrorMessage error={error} center /> }
      <StyledForm
        className={classnames(className, { valid, invalid: !valid })}
        style={style}
        onReset={form.handleReset}
        onSubmit={form.handleSubmit}
      >
        {children}
      </StyledForm>
    </FormikProvider>
  </BrixFormContext.Provider>;
};
