import styled from 'styled-components';

import { theme as t } from '../../css/theme';
import { LessonProgressProps } from './LessonProgress';

export const ProgressBarDiv = styled.div`
position: relative;
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
align-content: center;
`;

export const UnfinishedProgressDiv = styled.div<LessonProgressProps>`
display: flex;
flex: auto;
height: ${t.size('xbig')};
border-radius: 0 ${t.borderRadius.default} ${t.borderRadius.default} 0;
background: ${t.color('grey.200')};
`;

export const FinishedProgress = styled.div<LessonProgressProps>`
background: ${t.color('green')};
height: ${t.size('xbig')};
border-radius: ${t.borderRadius.default} 0 0 ${t.borderRadius.default};
transition: width .2s ease-in;
width: ${(props) => props.current && props.max ? props.current/props.max * 100 : 0}%;
`;
