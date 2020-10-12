import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export const Sidebar = styled.div`
  background: ${t.colors.white};
  opacity: 0.8;
  box-shadow: 0px 2px 10px ${t.colors.grey[200]};
  padding: ${t.size()};
`;
