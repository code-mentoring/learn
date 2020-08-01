import styled from 'styled-components';
import { theme } from '../css/theme';

export const Row = styled.div`
  margin-bottom: ${theme.size()};
  &:last-child {
    margin-bottom: 0;
  }
`;
