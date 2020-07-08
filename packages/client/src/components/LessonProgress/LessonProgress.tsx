import React, { useMemo } from 'react';

import { ProgressBar, Hex } from './LessonProgress.styles';


export interface LessonProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    max?: number;
    current: number;
}
export const LessonProgress: React.FC<LessonProgressProps> = ({
  current,
  max = 10,
  ...props
}) => {
  const perc = useMemo(() => {
    const p = (current / max) * 100;
    return (p > 100) ? 100 : p;
  }, [max, current]);

  return <ProgressBar percentage={perc} {...props}>
    <Hex percentage={perc} />
  </ProgressBar>;
};
