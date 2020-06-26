import { PathIcon } from '@codement/ui';
import React from 'react';
import styled from 'styled-components';

import styles from './ProgressPath.module.css';


const PathIconProgressWidget = styled(PathIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface PathProgress {
  icon: any;
  progress: number;
  size?: number;
  strokeWidth?: number;
  baseStroke?: string;
  progressStroke?: string;
}

const Styledp = styled.p`
font-size: .875rem;
text-align: center;
margin-bottom: 2rem;
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
font-weight: 800;
letter-spacing: 0.1em;
color: ${props => props.theme.colors.secondary[500]};
`;

export const ProgressPath: React.FC<PathProgress> = ({
  size = 48,
  strokeWidth = 3,
  baseStroke = 'grey-300',
  progressStroke = 'secondary-500',
  progress,
  icon
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = ((100 - progress) / 100) * circumference;

  return <div className="text-center">
    <div className="graphic relative inline-block">
      <svg
        width={size}
        height={size}
      >
        <circle
          className={`stroke-current text-${baseStroke}`}
          stroke={baseStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressValue}
          className={`stroke-current text-${progressStroke} ${styles.svgRotate} transform -rotate-90`}
        />
      </svg>
      <PathIconProgressWidget icon={icon} />
    </div>
    <Styledp>{`${progress}%`}</Styledp>
  </div>;
};
