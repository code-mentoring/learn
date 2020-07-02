import React, { HTMLProps } from 'react';
import styled from 'styled-components';

import { theme as t } from '../../css/theme';
import { firstUpper } from '../../lib/text';

export interface ErrorMessageProps extends HTMLProps<HTMLSpanElement> {
  error: string;
  center?: boolean;
}

const StyledError: React.FC<HTMLProps<HTMLSpanElement>> = styled.span<ErrorMessageProps>`
  display: block;
  text-align: ${p => (p.center ? 'center' : 'right')};
  color: ${t.color('error')};
  font-size: ${t.size('xsm')};
  font-weight: ${t.fontWeight.bold};
  margin-top: ${t.size('xtiny')};
  margin-bottom: ${t.size('tiny')};
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  ...props
}) => <StyledError {...props}> {firstUpper(error)} </StyledError>;
