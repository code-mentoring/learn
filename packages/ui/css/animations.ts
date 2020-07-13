import { keyframes } from 'styled-components';
import { theme } from './theme';

export const fadeRight = keyframes`
  from {
    transform: translate(${theme.size('xbig')});
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
`;
