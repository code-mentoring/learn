import { theme as t } from '@codement/ui';
import styled from 'styled-components';
import HexSvg from './hex.svg';


export const ProgressBar = styled.div<{percentage: number}>`
  position: relative;
  height: ${t.size()};
  border-radius: ${t.borderRadius.medium};
  background: ${t.color('secondary.100')};

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    width: ${p => p.percentage}%;
    background: ${t.color('green')};
    transition: width .5s cubic-bezier(0.68, -0.6, 0.32, 1.4);
    border-radius: ${t.borderRadius.medium};
  }
`;

export const Hex = styled(HexSvg)<{percentage: number}>`
  position: absolute;
  height: ${t.size('xl')};
  top: 50%;
  left: ${p => p.percentage}%;
  transform: translate(-50%, -50%);

  border-radius: 50%;
  background: ${t.color('white')};
  border: 4px solid ${t.color('white')};
  transition: left .5s cubic-bezier(0.68, -0.6, 0.32, 1.4);

  path {
    fill: ${t.color('secondary.200')};
    stroke: ${t.color('secondary.400')};
    stroke-width: 2;
  }
`;
