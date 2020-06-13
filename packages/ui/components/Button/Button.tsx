import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@codement/ui';

enum BtnType {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  transparent = 'transparent'
}

export interface ButtonProps extends HTMLAttributes<any> {
  text?: boolean;
  btnType?: 'primary' | 'secondary' | 'tertiary' | 'transparent'
  disabled?: boolean;
  size?: string;
  iconName?: string;
  iconPosition?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({
  iconName,
  iconPosition,
  children,
  ...props
}) => (
  // TODO: Fix Icon styling once Icon component is migrated to styled components.
  <StyledButton
    {...props}
  >
    { iconPosition === 'left' && <Icon className="inline-block" icon={iconName} />}
    { children }
    { iconPosition === 'right' && <Icon className="inline-block" icon={iconName} />}
  </StyledButton>
);

export const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  font-weight: 800;
  height: 2.25rem;
  line-height: 2.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-radius: 0.5rem;
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

  ${({ size }) => size === 'large' && css`
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
  `}

  ${({ btnType }) => btnType === BtnType.secondary && css`
    background-color: ${props => props.theme.colors.secondary['500']};
    &:hover {
      background-color: ${props => props.theme.colors.secondary['400']};
    }
    &:focus {
    background-color: ${props => props.theme.colors.secondary['600']};
    }
  `}

  ${({ btnType }) => btnType === BtnType.tertiary && css`
    background-color: ${props => props.theme.colors.tertiary['500']};
    &:hover {
      background-color: ${props => props.theme.colors.tertiary['400']};
    }
    &:focus {
    background-color: ${props => props.theme.colors.tertiary['600']};
    }
  `}

  ${({ btnType }) => btnType === BtnType.transparent && css`
    color: ${props => props.theme.colors.primary['500']};
    background-color: ${props => props.theme.colors.transparent};
    &:hover {
      background-color: ${props => props.theme.colors.transparent};
    }
    &:focus {
    background-color: ${props => props.theme.colors.transparent};
    color: ${props => props.theme.colors.grey['500']};
    }
  `}

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.grey['300']};
    &:hover {
      background-color: ${props => props.theme.colors.grey['300']};
    }
  `}
`;
