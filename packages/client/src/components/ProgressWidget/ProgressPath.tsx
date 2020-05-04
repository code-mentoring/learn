import React from 'react';
import styles from './ProgressPath.module.css';

// TODO: Replace Icon with PathIcon
// TODO: Figure out how to center PathIcon in progress circle

interface PathProgress {
  icon: any;
  progress: number;
}

export const ProgressPath: React.FC<PathProgress> = ({ progress }) => {
  const attributes = {
    size: 48,
    strokeWidth: 4,
    baseStroke: '#EAE7F6',
    progressStroke: '#0DD2AB'
  };

  const center = attributes.size / 2;
  const radius = center - attributes.strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = ((100 - progress) / 100) * circumference;

  return (
    <div className="inline-block mx-1">
      <svg
        width={attributes.size}
        height={attributes.size}
      >
        <g>
          <circle
            stroke={attributes.baseStroke}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={attributes.strokeWidth}
            fill="none"
          />
        </g>
        <g>
          <circle
            stroke={attributes.progressStroke}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={attributes.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressValue}
            className="svg-rotate transform -rotate-90"
          />
        </g>
        <Icon
          icon="x"
          size="small"
          width="40"
          height="40"
          x="4"
          y="4"
          className="text-primary-200"
        />
      </svg>
      <p className="text-center text-sm text-secondary-500 font-sans font-extrabold" style={{ letterSpacing: '1px' }}>{`${progress}%`}</p>
    </div>
    <p className={`text-center text-sm text-${progressStroke} font-sans font-extrabold tracking-widest`}>{`${progress}%`}</p>
};
