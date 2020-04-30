import React, { useState } from 'react';
import classnames from 'classnames';
// import '../../css/components/RadioList.css';


export interface Options {
  label: string;
  name: string;
  subLabel: string;
}

export interface RadioListProps {
  className?: string;
  options: Array<Options>;
  onChange: () => void;
}

export const RadioList: React.FC<RadioListProps> = ({
  className,
  options,
  onChange,
  ...props
}) => {

  const [chosenOption, setChosenOption] = useState<string>('');

  const handleClick = (label: string) => {
    setChosenOption(label);
  };

  const handleChange = () => {
    onChange();
  };

  return (
    <form
      className={classnames(
        'rounded border-2 border-grey-500 w-1/5',
        className
      )}
      {...props}
      onChange={handleChange}
    >
      {options.map(option => {
        const selectedDiv = 'text-grey-800 flex items-center justify-between w-100 border-b-2 border-grey-500 px-3 py-1 last:border-b-0 active:border focus-within:border-primary-900';
        const check = chosenOption === option.label;
        const computedProperty = { selected: check };

        return (
          <div
            key={option.label}
            className={classnames(selectedDiv, computedProperty)}
          >
            <div>
              <input
                type="radio"
                id={option.label}
                name={option.name}
                value={option.label}
                className="hidden"
                onClick={() => handleClick(option.label)}
              />
              <label htmlFor={option.label} className="pl-1 text-body">
                <span className="w-3 h-3 inline-block mt-2 mr-2 rounded border-2 border-grey-500 cursor-pointer radio" />
                {option.label}
              </label>
            </div>
            <div>
              {option.subLabel && (
                <p className="text-grey-500 text-sm">{option.subLabel}</p>
              )}
            </div>
          </div>
        );
      })}
    </form>
  );
};
