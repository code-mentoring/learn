import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../css/theme';
import { Color } from '../../types/styled';
import { IconProps } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { TextField, TextFieldProps } from '../TextField';


const StyledTextField: React.FC<TextFieldProps> = styled(TextField)`
  input {
    background: ${theme.colors.code.background};
    color: ${theme.colors.code.color};
    font-family: ${theme.fontFamily.code};
    border-color: ${theme.colors.code.background};
    &, &:hover, &:focus { border-color: ${theme.colors.code.background}; }
  }
`;

const Status = styled(Text)`
  margin-top: ${theme.size('sm')};
  font-weight: ${theme.fontWeight.bold};
`;

export interface CodeInputRegexProps extends TextFieldProps {
  regex: RegExp;
  minText?: number
}

export const CodeInputRegex: React.FC<CodeInputRegexProps> = ({
  regex,
  minText = 8,
  placeholder = 'Write your code here…',
  ...props
}) => {
  const [value, setValue] = useState('');

  const [icon, color, status] = useMemo<[
    IconProps['icon'] | undefined,
    Color | undefined,
    string
  ]>(() => {
    if (!value || value.length < minText) {
      let s;
      switch (value.length) {
        case 0:
          s = 'You never know until you try…';
          break;
        case 1:
        case 2:
          s = 'That\'s the spirit!';
          break;
        case 3:
        case 4:
          s = 'You got this!';
          break;
        case 5:
        case 6:
        default:
          s = 'Almost there…';
          break;
      }
      return [undefined, undefined, s];
    }
    if (regex.test(value)) return ['check', 'green', 'Well done!'];
    return ['x', 'tertiary', 'Keep trying!'];
  }, [value]);

  return <>
    <StyledTextField
      onChange={e => setValue((e.target as HTMLInputElement).value)}
      iconSecondary={icon}
      iconSecondaryColor={color}
      placeholder={placeholder}
      {...props}
    />
    <Status color={color} variant="small">{status}</Status>
  </>;
};
