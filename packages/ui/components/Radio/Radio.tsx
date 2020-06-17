import React, { HTMLProps, FormEvent } from 'react';
import { RadioDiv, RadioInput, RadioSpan } from './Radio.styles';


export interface RadioProps extends HTMLProps<HTMLInputElement> {
  name: string;
  value: any;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  value,
  onChange
}) => (<RadioDiv>
  <RadioInput type="radio" name={name} value={value} onChange={onChange} />
  <RadioSpan />
</RadioDiv>);
