import { PathIcon, Text, theme as t, PathIconType, centerAbsolute } from '@codement/ui';
import React from 'react';
import styled from 'styled-components';
import { Path } from '@codement/api';


const StyledPathProgress = styled.div`
  width: ${t.size('massive')};
  height: ${t.size('massive')};
  text-align: center;
  user-select: none;

  & > div {
    position: relative;
  }

  small {
    font-weight: ${t.fontWeight.bold}
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledPathIcon = styled(PathIcon)`
  ${centerAbsolute}
`;

const Wrapper = styled.div`
  position: relative;
  ${StyledPathIcon}, small { transition: all 0.1s ease-out; }

  small {
    text-align: center;
    opacity: 0;
    ${centerAbsolute};
  }

  &:hover {
    ${StyledPathIcon} { opacity: 0; }
    small { opacity: 1; }
  }
`;

const Svg = styled.svg`
  height: ${t.size('huge')};
  width: ${t.size('huge')};
`;

const Circle1 = styled.circle`
  stroke: ${t.color('grey.200')};
`;

const Circle2 = styled.circle`
  /* Allows svg element to rotate around its own center */
  transform-box: fill-box;
  transform-origin: center;
  stroke: ${t.color('green')};
  transform: rotate(-90deg);
`;


interface PathProgressProps { path: Path }


export const PathProgress: React.FC<PathProgressProps> = ({
  path
}) => {
  const size = 48;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressValue = ((100 - path.progress) / 100) * circumference;

  return <StyledPathProgress>
    <Wrapper>
      <Svg>
        <Circle1
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle2
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressValue}
        />
      </Svg>
      <StyledPathIcon icon={path.icon as PathIconType} size="xbig" />
      <Text as="small">{path.progress}%</Text>
    </Wrapper>

    <Text as="small">{path.name}</Text>
  </StyledPathProgress>;
};
