import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { firstUpper } from '../../lib/text';

export interface ErrorMessageProps extends HTMLProps<HTMLSpanElement> {
  error: string;
  center?: boolean;
}

const StyledError: React.FC<HTMLProps<HTMLSpanElement>> = styled.span<ErrorMessageProps>`
  ${({ theme: t, center }) => css`
    display: block;
    text-align: ${center ? 'center' : 'right'};
    color: ${t.color('error')};
    font-size: ${t.size('xsm')};
    font-weight: ${t.fontWeight.bold};
    margin-top: ${t.size('xtiny')};
    margin-bottom: ${t.size('tiny')};
  `}
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  ...props
}) => <StyledError {...props}> {firstUpper(error)} </StyledError>;
