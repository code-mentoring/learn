import React from 'react';
import { Icon } from '@codement/ui';
import { ProgressBarDiv, FinishedProgress, UnfinishedProgressDiv } from './LessonProgress.styles';

export interface LessonProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    max?: number;
    current?: number;
}
export const LessonProgress: React.FC<LessonProgressProps> = ({
    max = 1,
    current = 0,
}) => {
    max = max === 0 ? 1 : max;
    let completedPercentage = current / max * 100;
    if (completedPercentage > 100) {
        completedPercentage = 100;
    }
    return <ProgressBarDiv> 
        <FinishedProgress current={completedPercentage} max={max} />
        <Icon icon="hex" size="huge" color="secondary.200" strokeColor="secondary.400" strokeThickness="tiny" />
        <UnfinishedProgressDiv />
    </ProgressBarDiv>
}