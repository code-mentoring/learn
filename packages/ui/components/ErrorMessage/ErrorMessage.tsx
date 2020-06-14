import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { firstUpper } from '../../lib/text';

export interface ErrorMessageProps extends HTMLProps<HTMLSpanElement>{
  error: string;
  className?: string;
}

export const ErrorMessage = styled<React.FC<ErrorMessageProps>>(({
  error,
  className,
  ...props
}) =>
  <span className={className} {...props}>
    {firstUpper(error)}
  </span>)`
  display: block;
  color: ${props => props.theme.colors.error};
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: .25rem;
  margin-bottom: 0.5rem;
  `;
