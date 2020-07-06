import styled, { keyframes } from 'styled-components';

import { Icon } from '@codement/ui/components/Icon/Icon';
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
    animation: ${slideUp} 0.9s linear;
    position: relative;
    display: flex;
    width: 718px;
    height: 88px;
    flex-direction: row;
    align-items: center;
    align-content: center;
    background-color: ${t.color('white')};
    border-radius: ${t.borderRadius.large};
    box-shadow: ${t.shadows.main};
`;

export const IconBorder = styled.div<QuestionResultProps>`
    width: 40px;
    height: 40px;
    border-radius: ${t.borderRadius.circle};
    background: ${props => (props.state === 'success' ? t.color('secondary.400') : t.color('tertiary.500'))};
    margin: 23px 15px 23px 11px;
`;

export const StyledIcon = styled(Icon)`
    position: relative;
    top: 15%;
    left: 15%;
`;

export const StyledTextDiv = styled.div`
    width: 650px;
    padding-right: 11px;
`;
