import classnames from 'classnames';
import { FormikHandlers, getIn, useField, useFormikContext } from 'formik';
import React, { FunctionComponent, useMemo } from 'react';

import { firstUpper } from '../../lib/text';
import { Checkbox } from '../Checkbox/Checkbox';
import { CheckboxProps } from '../Checkbox/Checkbox.styles';
import { useBrixFormContext } from '../Form/Form';
import { Select } from '../Select/Select';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { TextField, TextFieldProps } from '../TextField/TextField';


// import { OptionProps } from 'react-select';
// import { ColorField } from '../ColorField/ColorField';
// import { DateField } from '../DateField/DateField';
// import { EntityImageField, ImageField } from '../ImageField/ImageField';
// import { MultiSelect } from '../MultiSelect/MultiSelect';
// import { Radio } from '../RadioField/Radio';
// import { RadioTab } from '../RadioTabField/RadioTab';
// import { Select } from '../Select/Select';
// import { Switch } from '../switch/Switch';
// import { TimeField } from '../TimeField/TimeField';


// import { CheckboxProps } from '../Checkbox/Checkbox.types';
// import { ColorFieldProps } from '../ColorField/ColorField.types';

// import { SelectProps } from '../Select/Select.types';
// import { MultiSelectProps } from '../MultiSelect/MultiSelect.types';
// import { SwitchProps } from '../switch/Switch.types';
// import { ImageFieldProps } from '../ImageField/ImageField.types';
// import { RadioTabProps } from '../RadioTabField/RadioTab.types';


export type FormFieldType =
  ({ type: 'text' | 'password' | 'number' } & TextFieldProps) |
  // ({ type: 'color' } & ColorFieldProps) |
  ({ type: 'checkbox' } & CheckboxProps);
// ({ type: 'switch' } & SwitchProps) |
// ({ type: 'select' } & Omit<SelectProps, 'name'>) |
// ({ type: 'multiselect' } & Omit<MultiSelectProps, 'name'>) |
// ({ type: 'image' } & ImageFieldProps) |
// ({ type: 'radio-tab' } & RadioTabProps) |
// ({ type: 'radio' } & RadioTabProps);

export type FormFieldBaseProps = {
  name: string;
  label?: string;
  labelComponent?: React.ComponentType<any>,
  className?: string;
  colSpan?: 1 | 2;
  changeOnBlur?: boolean;
  render?: (type: string, options: FormFieldCustomProps) => [React.FC<any>, { [key: string]: any }] | undefined;
};

export type FormFieldProps<T = {type: string}> = FormFieldBaseProps & (FormFieldType | T | {
  component?: React.ComponentType | FunctionComponent<any>,
  [prop: string]: any
});

export interface FormFieldCustomProps {
  onChange: (v: any) => void;
}

export const FormField: React.FunctionComponent<FormFieldProps> = (
  {
    name,
    label,
    labelComponent,
    className,
    colSpan = 2,
    changeOnBlur,
    // onChange: overridenOnChange,
    render,
    ...compProps
  }: FormFieldProps
) => {

  const [fieldFormik] = useField(name);
  const form = useFormikContext<any>();
  const brixForm = useBrixFormContext();
  const value = getIn(form.values, name);

  const onChange: FormikHandlers['handleChange'] = (e: any) => {
    form.setFieldTouched(name);
    fieldFormik.onChange(e);
  };

  const customChange = (v: any) => {
    form.setFieldTouched(name);
    form.setFieldValue(name, v);
  };

  useMemo(() => {
    if (
      brixForm
      && brixForm.onChange
      && form.touched[name]
      && !changeOnBlur
    ) brixForm.onChange(form.values, form);
  }, [value]);


  let error;
  if (name === 'time' && getIn(form.errors, name)) {
    if (getIn(form.touched.time, 'hours') && getIn(form.touched.time, 'minutes')) {
      error = Object.values(getIn(form.errors, name))[0];
    }
  } else {
    error = getIn(form.errors, name) && (form.submitCount > 0 || getIn(form.touched, name))
      ? getIn(form.errors, name)
      : null;
  }

  let extraProps: any = { error };

  if (changeOnBlur) {
    extraProps.onBlur = () => brixForm.onChange(form.values, form);
  }

  let Comp;
  if ('type' in compProps) {
    const { type } = compProps;

    switch (type) {
      case 'hidden':
        return <input
          {...fieldFormik}
          {...compProps as any}
          {...extraProps}
        />;
      case 'text':
      case 'number':
      case 'password':
        Comp = TextField;
        extraProps.type = type;
        break;
      case 'textarea':
        Comp = TextField;
        extraProps.type = type;
        extraProps.textarea = true;
        break;

        // case 'color':
        //   Comp = ColorField;
        //   break;

        // case 'time':
        //   Comp = TimeField;
        //   extraProps.onChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        //     form.setFieldTouched(e.target.name);
        //     form.setFieldValue(e.target.name,
        //       e.target.value === ''
        //         ? undefined
        //         : e.target.name.includes('ampm')
        //           ? e.target.value
        //           : parseInt(e.target.value));
        //   };
        //   break;

        // case 'date':
        //   Comp = DateField;
        //   extraProps.onChange = (e: any) => {
        //     form.setFieldValue(e.target.name, e.target.value);
        //   };
        //   break;

      case 'checkbox':
        Comp = Checkbox;
        extraProps.defaultChecked = Boolean(fieldFormik!.value);
        break;

        // case 'switch':
        //   Comp = Switch;
        //   extraProps.form = form;
        //   // @ts-ignore
        //   if (compProps.label2) {
        //     extraProps.label = label;
        //     label = undefined;
        //   }
        //   break;

      case 'select':
        Comp = Select;
        break;

        // case 'multiselect':
        //   Comp = MultiSelect;
        //   extraProps.onChange = (opts: OptionProps<{ value: number | string }>[]) => {
        //     form.setFieldTouched(name);
        //     form.setFieldValue(name, opts);
        //   };
        //   break;

        // case 'image':
        //   Comp = ImageField;
        //   extraProps.form = form;
        //   break;

        // case 'entity-image':
        //   Comp = EntityImageField;
        //   extraProps.form = form;
        //   break;

        // case 'radio-tab':
        //   Comp = RadioTab;
        //   extraProps.form = form;
        //   break;

        // case 'radio':
        //   Comp = Radio;
        //   extraProps.form = form;
        //   break;

      default:
        const noComp = new Error(`Could not find field type for '${type}'`);
        if (!render) throw noComp;

        // Render the FormField with a custom component
        const r = render(type, { onChange: customChange });
        if (!r) throw noComp;

        const [C, props] = r;
        Comp = C;
        extraProps = { ...extraProps, ...props };
    }
  } else {
    Comp = compProps.component;
  }

  const LC = labelComponent;

  return <div className={classnames('form-field', className, {
    [`col-span-${colSpan}`]: colSpan !== 2,
    'pt-2': !label
  })}
  >
    {label
      && (LC ? <LC htmlFor={name}>{label}</LC> : <label htmlFor={name}>{firstUpper(label)}</label>)
    }
    {Comp ? <Comp
      id={name}
      {...fieldFormik}
      {...compProps as any}
      {...extraProps}
      onChange={extraProps.onChange || onChange}
    /> : null}
    {typeof error === 'string' && <ErrorMessage error={error} className="text-right" />}
  </div>;
};
