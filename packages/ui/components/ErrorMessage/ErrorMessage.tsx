import classnames from 'classnames';
import React, { HTMLProps } from 'react';
import { firstUpper } from '../../lib/text';

export interface ErrorMessageProps extends HTMLProps<HTMLSpanElement>{
  error: string;
  className?: string;
}

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  error,
  className,
  ...props
}) =>
  <span className={classnames('error-message', className)} {...props}>
    {firstUpper(error)}
  </span>
