import classnames from 'classnames';
import React, { HTMLProps } from 'react';

import { Icon } from '../Icon/Icon';


export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}


export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  indeterminate,
  ...props
}) => {
  if (props.checked === undefined) props.checked = Boolean(props.value);

  return <label className={classnames('checkbox', { indeterminate })}>
    <input type="checkbox" {...props} />
    <span>
      {<Icon icon={indeterminate ? 'minus' : 'check'} color="white" />}
    </span>
  </label>;
};
