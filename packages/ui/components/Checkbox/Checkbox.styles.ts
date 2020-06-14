import React, { HTMLProps } from 'react';
import styled from 'styled-components';

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  text?: string;
  indeterminate?: boolean;
}

export interface InputProps extends CheckboxProps {
  type?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  checked?: boolean;
  defaultChecked?: boolean;
}

export interface SpanProps extends InputProps {}

export const CheckboxDiv = styled.div<CheckboxProps>`
  position: relative;
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input<InputProps>`
  position: absolute;
  margin-left: 0;
  margin-top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
`;

export const CheckboxIconContainer = styled.span<SpanProps>`
  display: inline-flex;
  height: 1rem;
  width: 1rem;
  border: 2px solid ${props => (props.checked ? props.theme.colors.primary['500'] : props.theme.colors.grey['500'])};
  border-radius: 2px;
  margin-right: 0.5rem;
  background-color: ${props => (props.checked ? props.theme.colors.primary['500'] : undefined)};
  & svg {
    height: 100%;
    width: 100%;
  }
  & +span {
    color: ${props => props.theme.colors.grey['500']};
    font-size: 0.875rem;
  }
`;
