import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import { Radio } from '../Radio/Radio';


export interface Options {
  label: string;
  value: any;
  subLabel?: string;
}

export interface RadioListProps {
  className?: string;
  name: string;
  options: Array<Options>;
  value?: any;
  onChange?: (value: any) => void;
}

export const RadioList: React.FC<RadioListProps> = ({
  className,
  options,
  onChange,
  name,
  value,
  ...props
}) => {
  // Internal state for which value is selected
  const [chosenOption, setChosenOption] = useState<any>(value);

  // Update the onChange whenever a radio item is clicked
  useEffect(() => {
    if (onChange) onChange(chosenOption);
  }, [chosenOption]);

  return <div
    className={classnames('radio-list w-full', className)}
    {...props}
  >
    {options.map(option => {
      // Is the current option selected?
      const check = chosenOption === option.value;

      return <label
        key={option.label}
        className={classnames({ active: check })}
      >
        <Radio
          name={name}
          value={option.label}
          className="mr-3"
          onChange={e => {
            if ((e.target as HTMLInputElement).checked) setChosenOption(option.value);
          }}
          defaultChecked={check}
        />
        <span>{option.label}</span>
        {option.subLabel
          && <small className="text-grey-600 text-sm">{option.subLabel}</small>
        }
      </label>;
    })}
  </div>;
};
