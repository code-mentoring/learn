import styled from 'styled-components';
import { RadioProps } from './Radio';

export const RadioDiv = styled.div`
  display: flex;
  margin-right: ${p => p.theme.size('xsm')};
`;

export const RadioInput: React.FC<RadioProps> = styled.input`
  display: none;
  &:checked + span {
    border-color: ${p => p.theme.color('primary.500')};
    &::after {
      content: "";
      height: 0.5rem;
      width: 0.5rem;
      background-color: ${p => p.theme.color('primary.500')};
      border-radius: ${p => p.theme.borderRadius.circle};
    }
  }
`;

export const RadioSpan = styled.span`
  display: inline-flex;
  border: ${p => p.theme.borders.main};
  border-radius: ${p => p.theme.borderRadius.circle};
  justify-content: center;
  align-items: center;
  height: ${p => p.theme.size()};
  width: ${p => p.theme.size()};
  font-size: 0;
`;
