import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export const SectionBody = styled.div<{rows: number}>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-gap: ${t.size('md')};
  padding: ${t.size('md')};

  div {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-gap: ${t.size('xsm')};
    align-items: center;
  }
`;
