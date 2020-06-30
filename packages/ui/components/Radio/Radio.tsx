import React, { HTMLProps } from 'react';

import { RadioDiv, RadioInput, RadioSpan } from './Radio.styles';

export interface RadioProps extends HTMLProps<HTMLInputElement> { }

export const Radio: React.FC<RadioProps> = props => <RadioDiv>
  <RadioInput type="radio" {...props} />
  <RadioSpan />
</RadioDiv>;
