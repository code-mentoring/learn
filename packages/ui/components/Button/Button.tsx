import React, { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@codement/ui';
import { theme as th } from '../../css/theme';

export enum BtnSize {
  small = 'small',
  large = 'large'
}

export enum BtnType {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  transparent = 'transparent'
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text?: boolean;
  btnType?: 'primary' | 'secondary' | 'tertiary' | 'transparent'
  disabled?: boolean;
  size?: 'small' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right'
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = 'left',
  children,
  btnType = 'primary',
  ...props
}) => <StyledButton
  backgroundColor={btnType === 'transparent' ? th.colors[btnType] : th.colors[btnType]['500']}
  backgroundColorHover={btnType === 'transparent' ? th.colors[btnType] : th.colors[btnType]['400']}
  backgroundColorFocus={btnType === 'transparent' ? th.colors[btnType] : th.colors[btnType]['600']}
  {...props}
>
  { icon && iconPosition === 'left' && <ButtonIconLeft size={8} icon={icon} />}
  <span>{ children }</span>
  { icon && iconPosition === 'right' && <ButtonIconRight size={8} icon={icon} />}
</StyledButton>;

const ButtonIconLeft = styled(props => <Icon {...props} />)`
  margin-right: 10px;
`;

const ButtonIconRight = styled(props => <Icon {...props} />)`
  margin-left: 10px;
`;

export interface StyledButtonProps extends ButtonProps {
  backgroundColor: string;
  backgroundColorHover: string;
  backgroundColorFocus: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  height: 36px;
  line-height: 19px;
  padding: 13px 20px;
  border-radius: 8px;
  letter-spacing: 0.75px;
  text-align: center;
  text-transform: uppercase;
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
  color: ${({ btnType, theme }) => (btnType === 'transparent' ? theme.colors.primary['500'] : theme.colors.white)};
  background-color: ${({ backgroundColor }) => backgroundColor};
  opacity: ${({ disabled }) => disabled && '0.5'};
  &:hover {
    background-color: ${({ backgroundColorHover }) => backgroundColorHover};
  }
  &:focus {
    background-color: ${({ backgroundColorFocus }) => backgroundColorFocus};
    color: ${({ btnType, theme }) => btnType === 'transparent' && theme.colors.grey['500']};
  }

  ${({ size }) => size === BtnSize.large && css`
    height: 48px;
    line-height: 22px;
    font-size: 16px;
  `}
`;
