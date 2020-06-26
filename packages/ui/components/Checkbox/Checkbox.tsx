import classnames from 'classnames';
import React, { useState } from 'react';

import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { CheckboxDiv, CheckboxIconContainer, CheckboxInput, CheckboxProps } from './Checkbox.styles';

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
      {text && <Text as="small" color="grey.800">{text}</Text>}
    </CheckboxDiv>
  );
};
