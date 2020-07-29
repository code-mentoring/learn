import styled, { css } from 'styled-components';
import { Color } from '../../types/styled';
import { ButtonProps } from './Button';
import { theme as t } from '../../css/theme';
import { Icon } from '../Icon/Icon';


export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  height: ${t.size('xl')};
  padding: 0 ${t.size('big')};
  border-radius: ${t.borderRadius.default};
  letter-spacing: 0.75px;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.1s ease-out;

  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.3 : 1)};

  &:disabled {
    pointer-events: none;
  }

  ${p => (p.text
    ? css`
      color: ${t.color(p.color)};
      background: transparent;
      &:hover { background: ${t.color('grey.100')} }
      &:focus, &:active { background: ${t.color('grey.200')} }
    ` : css`
      &, span { color: ${t.color('white')}; }
      background: ${t.color(p.color)};
      &:hover { background: ${t.color(`${p.color}.400` as Color)} }
      &:focus, &:active { background: ${t.color(`${p.color}.600` as Color)} }
    `
  )}

  ${p => p.size === 'large' && css`
    height: ${t.size('huge')};
    font-size: 16px;
  `}
`;


export const ButtonIcon = styled(Icon)<{position: 'left' | 'right'}>`
  margin-${p => (p.position === 'right' ? 'left' : 'right')}: ${t.size()};
  color: currentColor;
`;
