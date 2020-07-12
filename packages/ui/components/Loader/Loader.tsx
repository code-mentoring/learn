import React from 'react';
import styled, { keyframes } from 'styled-components';

import { centerAbsolute } from '../../css/common';
import { theme } from '../../css/theme';
import { Color, Size } from '../../types/styled';

export interface LoaderProps {
  size?: Size;
  color?: Color;
  center?: boolean;
  partyMode?: boolean;
}

const svgKeyframes = keyframes`
  from { transform: none; }
  to { transform: rotate(180deg); }
`;
const partyKeyframes = keyframes`
  0% { color: ${theme.color('primary')}; }
  25% { color: ${theme.color('secondary')}; }
  50% { color: ${theme.color('tertiary')}; }
  75% { color: ${theme.color('grey.900')}; }
`;

const Wrapper = styled.div<LoaderProps>`
  position: relative;
  width: ${p => theme.size(p.size)};
  height: ${p => theme.size(p.size)};
  color: ${p => theme.color(p.color || 'grey.600')};
  animation: ${partyKeyframes} 0.8s infinite;
  ${p => p.center && centerAbsolute}
`;

const Svg = styled.svg<LoaderProps>`
  width: 100%;
  height: 100%;
  overflow: visible;
  path { fill: currentColor; stroke: currentColor; stroke-width: 0.4; }
`;
const p2Keyframes = keyframes`
  from { transform: none; }
  to { transform: translateX(20%); }
`;

const p3Keyframes = keyframes`
  from { transform: none; }
  to { transform: translateX(-20%); }
`;

// animation: ${svgKeyframes} 0.66s infinite cubic-bezier(0.25, 0.75, 0.36, 0.9);: ${svgKeyframes} 0.66s infinite cubic-bezier(0.25, 0.75, 0.36, 0.9);
// animation: ${svgKeyframes} 0.66s infinite cubic-bezier(0.3, 0.75, 0.36, 0.8);
const P1 = styled.path`
  animation: ${svgKeyframes} 0.66s infinite cubic-bezier(0.7, 0.3, 1, 0.8);
  transform-origin: center;
`;

const P2 = styled.path`
  animation: ${p2Keyframes} 0.33s infinite cubic-bezier(0.22, 0.7, 0.36, 1) alternate;
`;

const P3 = styled.path`
  animation: ${p3Keyframes} 0.33s infinite cubic-bezier(0.22, 0.7, 0.36, 1) alternate;
`;

// TODO: Turn into something nicer (needs design)
export const Loader: React.FC<LoaderProps> = p =>
  <Wrapper {...p}>
    <Svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <P1 d="M14.872 21.22H13.168L17.128 10.78H18.832L14.872 21.22Z" />
      <P2 d="M26.536 16.696L21.832 19.696V17.848L24.856 16.024V15.976L21.832 14.152V12.304L26.536 15.304V16.696Z" />
      <P3 d="M5.46387 15.304L10.1679 12.304V14.152L7.14387 15.976V16.024L10.1679 17.848V19.696L5.46387 16.696V15.304Z" />
    </Svg>
  </Wrapper>;

Loader.defaultProps = { size: 'xl', center: true };
