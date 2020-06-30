import React, { HTMLProps } from 'react';
import styled from 'styled-components';

import { theme as t } from '../../css/theme';

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

export interface SpanProps extends InputProps { }

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
  height: ${t.size('big')};
  width: ${t.size('big')};
  border: ${t.borders.main};
  border-radius: ${t.borderRadius.small};
  margin-right: ${t.size('xsm')};

  ${p => {
    const bg = t.color(p.checked ? 'primary' : 'transparent');
    const border = t.color(p.checked ? 'primary' : 'grey.300');
    return `background-color: ${bg}; border-color: ${border};`;
  }}

  & svg {
    height: 100%;
    width: 100%;
  }
`;
