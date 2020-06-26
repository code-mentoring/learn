import styled, { css } from 'styled-components';
import { Color } from '../../types/styled';
import { ButtonProps } from './Button';


export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  height: ${p => p.theme.size('xl')};
  padding: 0 ${p => p.theme.size('big')};
  border-radius: ${p => p.theme.borderRadius.default};
  letter-spacing: 0.75px;
  text-align: center;
  text-transform: uppercase;
  border: none;

  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.5 : 1)};

  ${p => (p.text
    ? css`
      color: ${p.theme.color(p.color)};
      background: transparent;
      &:hover { background: ${p.theme.color('grey.100')} }
      &:focus, &:active { background: ${p.theme.color('grey.200')} }
    ` : css`
      color: white;
      background: ${p.theme.color(p.color)};
      &:hover { background: ${p.theme.color(`${p.color}.400` as Color)} }
      &:focus, &:active { background: ${p.theme.color(`${p.color}.600` as Color)} }
    `
  )}

  ${p => p.size === 'large' && css`
    height: ${p => p.theme.size('huge')};
    font-size: 16px;
  `}
`;
