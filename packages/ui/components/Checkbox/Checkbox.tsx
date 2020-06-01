import classnames from 'classnames';
import React, { HTMLProps, useState } from 'react';

import { Icon } from '../Icon/Icon';
import styles from './Checkbox.module.css';


export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  text?: string;
  indeterminate?: boolean;
}


export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  indeterminate,
  defaultChecked,
  onChange,
  text,
  ...props
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return <div
    className={classnames(styles.checkbox, {
      indeterminate,
      [styles.checked]: checked
    })}
  >
    <input
      type="checkbox"
      {...props}
      checked={checked}
      onChange={e => {
        setChecked(e.target.checked);
        if (onChange) onChange(e);
      }}
    />
    <span className={styles.icon}>
      <Icon icon={indeterminate ? 'minus' : 'check'} color="white" />
    </span>
    {text && <span>{text}</span>}
  </div>;
};
