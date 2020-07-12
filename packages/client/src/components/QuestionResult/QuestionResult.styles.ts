import styled, { keyframes } from 'styled-components';

import { theme as t } from '@codement/ui/css/theme';
import { QuestionResultProps } from './QuestionResult';

const slideUp = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, 75%, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
`;

export const QuestionResultDiv = styled.div`
    animation: ${slideUp} 0.3s ease-out;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    background-color: ${t.color('white')};
    border-radius: ${t.borderRadius.large};
    box-shadow: ${t.shadows.main};
`;

export const IconBorder = styled.div<QuestionResultProps>`
    width: ${t.sizes.xl};
    height: ${t.sizes.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${t.borderRadius.circle};
    background: ${p => (p.state === 'success' ? t.color('secondary.400') : t.color('tertiary.500'))};
    margin: ${t.sizes.xbig} ${t.sizes.sm} ${t.sizes.xbig} ${t.sizes.xsm};
`;
