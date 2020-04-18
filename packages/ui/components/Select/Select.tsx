import classnames from 'classnames';
import React, { HTMLProps } from 'react';

import { Icon, IconType } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';

export interface SelectOption {
  label: string | number;
  value: string | number | undefined;
  selected?: boolean;
  disabled?: boolean;
}

export interface SelectProps extends Partial<HTMLProps<HTMLSelectElement>> {
  options: SelectOption[];
  icon?: IconType;
  iconSecondary?: IconType;
  iconColor?: string;
  iconSecondaryColor?: string;
  error?: string | Error;
  onChange?: (event: React.FormEvent<HTMLSelectElement>) => void;
  loading?: boolean;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  options,
  icon,
  iconSecondary,
  iconColor = 'grey-30',
  iconSecondaryColor,
  className,
  error,
  disabled,
  placeholder,
  loading,
  ...props
}) => {
  const err = error ? error.toString() : null;
  const icon2: IconType | undefined = err ? 'exclamation' : iconSecondary;
  const icon2Color = err ? 'error' : iconSecondaryColor;

  return <div className={classnames('select', className, {
    loading,
    disabled,
    error
  })}>
    {loading
      ? <Loader />
      : icon && <Icon icon={icon} color={iconColor} />}
    {icon2 && <Icon icon={icon2} color={icon2Color} />}
    <Icon icon="chevronDown" color="grey-40" />

    <select {...props} disabled={disabled} >
      {placeholder && <option key={-1} value={''}>{placeholder}</option>}
      {options.map(({ label, value, selected, disabled }, idx) =>
        <option key={idx} value={value} selected={selected} disabled={disabled}>{label}</option>
      )}
    </select>

  </div>;
};
