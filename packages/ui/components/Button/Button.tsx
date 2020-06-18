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
  icon?: string;
  iconPosition?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = 'left',
  children,
  ...props
}) => (

  <StyledButton
    {...props}
  >
    { icon && iconPosition === 'left' && <ButtonIcon icon={icon} />}
    { children }
    { icon && iconPosition === 'right' && <ButtonIcon icon={icon} />}
  </StyledButton>
);

const ButtonIcon = styled(props => <Icon {...props} />)`
  display: inline-block;
  margin: 5;
`;

const StyledButton = styled.button<ButtonProps>`
  font-weight: 800;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
  letter-spacing: 0.75px;
  display: block;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  
  color: ${props => props.theme.colors.white};
  
  background-color: ${props => props.theme.colors.primary['500']};

  &:hover {
    background-color: ${props => props.theme.colors.primary['400']};
  }

  &:focus {
    background-color: ${props => props.theme.colors.primary['600']};
  }

  ${({ size }) => size === 'large' && css`
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
