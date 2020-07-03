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
    return <ProgressBarDiv> 
        <FinishedProgress current={current} max={max} />
        <Icon icon="hex" size="huge" color="secondary.200" strokecolor="secondary.400" storkethickness="tiny" />
        <UnfinishedProgressDiv />
    </ProgressBarDiv>
}