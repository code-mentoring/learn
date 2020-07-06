import styled from 'styled-components';
import { RadioProps } from './Radio';
import { theme as t } from '../../css/theme';

export const RadioDiv = styled.div`
  display: flex;
  margin-right: ${t.size('xsm')};
`;

export const RadioInput: React.FC<RadioProps> = styled.input`
  display: none;
  &:checked + span {
    border-color: ${t.color('primary.500')};
    &::after {
      content: "";
      height: ${t.size('tiny')};
      width: ${t.size('tiny')};
      background-color: ${t.color('primary.500')};
      border-radius: ${t.borderRadius.circle};
    }
  }
`;

export const RadioSpan = styled.span`
  display: inline-flex;
  border: ${t.borders.main};
  border-radius: ${t.borderRadius.circle};
  justify-content: center;
  align-items: center;
  height: ${t.size()};
  width: ${t.size()};
  font-size: 0;
`;
