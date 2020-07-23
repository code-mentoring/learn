import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { shortid } from '../../lib/shortid';
import { Radio } from '../Radio/Radio';
import { RadioListDiv, RadioListLabel, RadioListSmall } from './RadioList.styles';


export interface Options {
  label: string;
  value: any;
  subLabel?: string;
}

export interface RadioListProps {
  name?: string;
  className?: string;
  options: Array<Options>;
  value?: any;
  onChange?: (value: any) => void;
}

export const RadioList: React.FC<RadioListProps> = ({
  className,
  options,
  onChange,
  name = shortid(),
  value,
  ...props
}) => {
  // Internal state for which value is selected
  const [chosenOption, setChosenOption] = useState<any>(value);

  // Update the onChange whenever a radio item is clicked
  useEffect(() => {
    if (onChange) onChange(chosenOption);
  }, [chosenOption]);

  return <RadioListDiv className={className} {...props}>
    {options.map(o => {
      // Is the current option selected?
      const check = chosenOption === o.value;

      return <RadioListLabel
        key={o.label}
        className={classnames({ active: check })}
      >
        <Radio
          name={name}
          value={o.label}
          onChange={e => {
            if ((e.target as HTMLInputElement).checked) setChosenOption(o.value);
          }}
          defaultChecked={check}
        />
        <span>{o.label}</span>
        {o.subLabel && (
          <RadioListSmall>{o.subLabel}</RadioListSmall>
        )}
      </RadioListLabel>;
    })}
  </RadioListDiv>;
};
