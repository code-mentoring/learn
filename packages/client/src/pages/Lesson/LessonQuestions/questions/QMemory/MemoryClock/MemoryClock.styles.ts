import { theme, Card } from '@codement/ui';
import styled, { keyframes, css } from 'styled-components';


const flashCardAnimation = keyframes`
  from {
    background-color: ${theme.color('tertiary')};
    color: ${theme.color('white')};
  }
  to {
    background-color: ${theme.color('white')};
    color: ${theme.color('grey.600')};
  }
`;

export const StyledCardProgress = styled(Card)<{ duration: number; started?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${theme.size('xl')};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color('grey.600')};
  user-select: none;

  ${({ duration, started }) => {
    if (duration > 10000) return;
    if (duration <= 0) {
      return css`
        background: ${theme.color('tertiary')};
        color: ${theme.color('white')};
      `;
    }
    if (!started) return;
    return css`
      animation: ${flashCardAnimation} infinite 1s;
    `;
  }};
`;
