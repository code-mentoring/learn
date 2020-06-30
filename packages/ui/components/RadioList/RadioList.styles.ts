import styled from 'styled-components';

import { theme as t } from '../../css/theme';

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
  border: ${t.borders.main};
  border-bottom: none;
  padding: 0 ${t.size('xsm')};
  height: ${t.size('huge')};;
  color: ${t.color('primary')};
  cursor: pointer;
  transition: all;

  &:hover {
    background-color: ${t.color('primary.100')};
  }

  &:first-of-type {
    border-top-left-radius: ${t.borderRadius.medium};
    border-top-right-radius: ${t.borderRadius.medium};
  }

  &:last-of-type {
    border-bottom: ${t.borders.main};
    border-bottom-left-radius: ${t.borderRadius.medium};
    border-bottom-right-radius: ${t.borderRadius.medium};
  }

  &.active {
    background-color: ${t.color('primary.100')};
    border-color: ${t.color('primary')};

    &:not(:last-of-type)::after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      background-color: ${t.color('primary')};
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
