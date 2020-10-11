import styled from 'styled-components';
import { theme as t } from '@codement/ui';

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
