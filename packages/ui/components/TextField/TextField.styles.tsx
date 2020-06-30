import styled, { css } from 'styled-components';

import { theme as t } from '../../css/theme';
import { BaseTextField, TextFieldProps } from './TextField';

const baseFieldStyles = css<BaseFieldProps>`${p => {
  const size = t.size(p.size === 'main' ? 'huge' : 'xl');

  return css`
    display: inline-block;
    align-self: middle;
    border-radius: ${t.borderRadius.default};
    border: ${t.borders.main};
    font-family: ${t.fontFamily.sans};
    font-size: ${t.size('sm')};
    color: ${t.color('grey.900')};
    width: 100%;
    height: 100%;
    padding: 0 ${t.size()};
    transition: all 0.1s ease-in-out;
    ${p.iconLeft && `padding-left: ${size};`}
    ${p.iconRight && `padding-right: ${size};`}

    &:hover { border-color: ${t.color('grey.400')}; }
    &:focus { border-color: ${t.color('primary.500')}; }
  `;
}}`;


export interface BaseFieldProps {
  iconLeft?: boolean;
  iconRight?: boolean;
  size?: TextFieldProps['size'];
}

export const StyledInput = styled.input`${baseFieldStyles}`;
export const StyledTextarea = styled.textarea`${baseFieldStyles}`;


export const TextField = styled(BaseTextField)`${p => {
  const size = t.size(p.size === 'main' ? 'huge' : 'xl');
  const padding = t.size(p.size === 'main' ? 'xsm' : 'tiny');
  return css`
    position: relative;
    height: ${size};

    input { width: 100%; }

    svg {
      padding: ${padding};
      position: absolute;
      height: 100%;
      width: ${size};
    }

    svg[data-second] { right: 0; }
  `;
}}`;

TextField.defaultProps = { size: 'main' };
