import { keyframes, css } from 'styled-components';
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

export const fadeUp = keyframes`
  from {
    transform: translateY(${theme.size('xbig')});
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
`;
export const aniFadeUp = css`
  opacity: 0;
  animation: ${fadeUp} 0.3s ease-out forwards
`;

export const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
