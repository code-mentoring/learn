import { css } from 'styled-components';

export const centerAbsolute = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const cover = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


export const timingBounce = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
