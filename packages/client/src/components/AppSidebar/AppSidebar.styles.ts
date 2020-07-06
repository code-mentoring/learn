import styled from 'styled-components';
import { theme as t } from '@codement/ui';
import { NavLink } from 'react-router-dom';

export const StyledAppSidebar = styled.nav<{ minimal?: boolean }>`
  padding-top: ${t.size('huge')};
`;

export const SidebarLink = styled(NavLink)`
  height: ${t.size('huge')};
  height: ${t.size('huge')};
  display: flex;
  align-items: center;
  padding: 0 ${t.size('huge')};

  svg { margin-right: ${t.size('sm')} }

  svg, h3 { color: ${t.color('grey')}; }

  &.active {
    background: ${t.color('primary.100')};
    svg, h3 { color: ${t.color('primary')}; }
  }
`;
