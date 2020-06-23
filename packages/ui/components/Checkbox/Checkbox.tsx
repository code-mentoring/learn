import classnames from 'classnames';
import React, { useState } from 'react';
import {
  CheckboxProps,
  CheckboxDiv,
  CheckboxIconContainer,
  CheckboxInput
} from './Checkbox.styles';

import { Icon } from '../Icon/Icon';

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  indeterminate,
  defaultChecked,
  onChange,
  text
  // ...props
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <CheckboxDiv
      className={classnames({
        indeterminate,
        checked
      })}
    >
      <CheckboxInput
        type="checkbox"
        // {...props}
        checked={checked}
        onChange={(e: any) => {
          setChecked(e.target.checked);
          if (onChange) onChange(e);
        }}
      />
      <CheckboxIconContainer checked={checked}>
        <Icon icon={indeterminate ? 'minus' : 'check'} color="white" />
      </CheckboxIconContainer>
      {text && <span>{text}</span>}
    </CheckboxDiv>
  );
};
