import styled from 'styled-components';

export const RadioListDiv = styled.div`
  --webkit-user-select: none;
  --moz-user-select: none;
  --ms-user-select: none;
  user-select: none;
  width: 100%;
`;

export const RadioListLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid ${props => props.theme.colors.grey[500]};
  border-bottom: none;
  padding: 0 0.75rem;
  height: 3rem;
  color: ${props => props.theme.colors.grey[800]};
  cursor: pointer;
  transition: all;

  &:hover {
    background-color: ${props => props.theme.colors.primary[100]};
  }

  &:first-of-type {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  &:last-of-type {
    border-bottom: 2px solid ${props => props.theme.colors.grey[500]};
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  &.active {
    background-color: ${props => props.theme.colors.primary[100]};
    border-color: ${props => props.theme.colors.primary[500]};

    &:not(:last-of-type)::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      background-color: ${props => props.theme.colors.primary[500]};
      bottom: -2px;
      height: 2px;
      z-index: 10;
    }
  }
`;

export const RadioListSmall = styled.small`
  margin-left: auto;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.grey[600]};
`;
