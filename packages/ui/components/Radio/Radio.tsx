import React, { HTMLProps } from 'react';
import classnames from 'classnames';

export interface RadioProps extends HTMLProps<HTMLInputElement> {}


export const Radio: React.FC<RadioProps> = ({
  className,
  ...props
}) => <div className={classnames('radio', className)}>
  <input {...props} type="radio" />
  <span />
</div>;
