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
  className?: string;
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
    { icon && iconPosition === 'left' && <ButtonIconLeft size={8} icon={icon} />}
    { children }
    { icon && iconPosition === 'right' && <ButtonIconRight size={8} icon={icon} />}
  </StyledButton>
);

const ButtonIconLeft = styled(props => <Icon {...props} />)`
  margin-right: 14px;
  display: inline;
`;

const ButtonIconRight = styled(props => <Icon {...props} />)`
  margin-left: 14px;
  display: inline;
`;

const StyledButton = styled.button<ButtonProps>`
  ${({ size }) => size === 'large' && css`
    height: 4.8rem;
    line-height: 4.8rem;
    font-size: 1.6rem;
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
