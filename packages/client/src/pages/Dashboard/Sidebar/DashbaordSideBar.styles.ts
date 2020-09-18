import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export const Siderbar = styled.div`
background: ${t.colors.white};
opacity: 0.8;
box-shadow: 0px 2px 10px ${t.colors.grey[200]};
padding: ${t.size()};
`;

export const SectionHeader = styled.div<{noBorder?:boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => !p.noBorder && `border-bottom: ${t.borders.main}`};
  padding: ${t.size('sm')};

  p {
    padding: ${t.size('tiny')};
  }
`;

export const SectionBody = styled.div<{rows: number}>`
  display: grid;
  grid-template-columns: repeat(2,1fr);
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
