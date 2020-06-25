import styled from 'styled-components';

export const RadioDiv = styled.div`
  display: flex;
  margin-right: 0.75rem;
`;

export const RadioInput = styled.input`
  display: none;
  &:checked + span {
    border-color: ${props => props.theme.colors.primary[500]};
    &::after {
      content: "";
      height: 0.5rem;
      width: 0.5rem;
      background-color: ${props => props.theme.colors.primary[500]};
      border-radius: ${props => props.theme.borderRadius.circle};
    }
  }
`;

export const RadioSpan = styled.span`
  display: inline-flex;
  border: 2px solid ${props => props.theme.colors.grey[500]};
  border-radius: ${props => props.theme.borderRadius.circle};
  justify-content: center;
  align-items: center;
  height: 1rem;
  width: 1rem;
  font-size: 0;
`;
