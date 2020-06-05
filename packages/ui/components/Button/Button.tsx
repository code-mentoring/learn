import classnames from 'classnames';
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@codement/ui';


export type ButtonProps = {
  text?: boolean;
  large?: string;
  success?: string;
};

export const CButton: React.FunctionComponent<ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>> = ({
  children,
  className,
  text,
  color,
  size,
  type = 'submit',
  ...props
}) => {
  const classes: any = {};
  if (color) classes[`btn-${color}`] = true;
  if (size) classes[`btn-${size}`] = true;
  if (text) classes[`btn-${text}`] = true;
  // eslint-disable-next-line react/button-has-type
  return <button
    type={type}
    className={classnames(className)}
    {...props}
  >{children}
  </button>;
};

export const Button = styled(CButton)`
  display: inline-block;
  font-weight: 700;
  height: 2rem;
  line-height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  background-color: ${props => props.theme.colors.primary['500']};

  &:hover {
    background-color: ${props => props.theme.colors.primary['400']};
  }

  &:focus {
    background-color: ${props => props.theme.colors.primary['600']};
  }

  ${({ large }) => large && css`
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
  `}

  ${({ success }) => success && css`
    background-color: ${props => props.theme.colors.secondary['500']};
    &:hover {
      background-color: ${props => props.theme.colors.secondary['400']};
    }
    &:focus {
    background-color: ${props => props.theme.colors.secondary['600']};
    }
  `}

  ${({ })}
`;
