import styled, { css } from 'styled-components';
import { TextFieldProps } from './TextField';

const baseFieldStyles = css<BaseFieldProps>`${({ theme: t, hasIcon }) => css`
  display: inline-block;
  align-self: middle;
  border-radius: ${t.borderRadius.default};
  border: ${t.borders.main};
  font-family: ${t.fontFamily.sans};
  font-size: ${t.size('sm')};
  color: ${t.color('grey.900')};
  width: 100%;
  height: ${t.size('huge')};
  padding: 0 ${t.size()};
  transition: all 0.1s ease-in-out;

  &:hover { border-color: ${t.color('grey.400')}; }
  &:focus { border-color: ${t.color('primary.500')}; }

  ${hasIcon === 'left' && `padding-left: ${t.size('huge')};`}
  ${hasIcon === 'right' && `padding-right: ${t.size('huge')};`}
  ${hasIcon === 'both' && `padding: 0 ${t.size('huge')};`}
`}`;

export interface BaseFieldProps {
  hasIcon?: 'left' | 'right' | 'both'
}

export const StyledInput = styled.input`${baseFieldStyles}`;
export const StyledTextarea = styled.textarea`${baseFieldStyles}`;


export const StyledTextField = styled.div<TextFieldProps>`
  position: relative;

  input { width: 100%; }

  svg {
    padding: ${p => p.theme.size('sm')};
    position: absolute;
    height: 100%;
    width: ${p => p.theme.size('huge')};
  }

  svg[data-second] {
    right: 0;
  }
`;
