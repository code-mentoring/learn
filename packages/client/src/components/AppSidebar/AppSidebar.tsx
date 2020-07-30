import { Icon, IconType, Text } from '@codement/ui';
import React from 'react';

import { routes } from '../../router/routes';
import { SidebarLink, StyledAppSidebar } from './AppSidebar.styles';


export interface AppSidebarProps { }

const menuItems: { icon: IconType, text: string, to: string }[] = [
  { icon: 'dashboard', text: 'Dashboard', to: routes.home() },
  { icon: 'settings', text: 'Settings', to: routes.settings() }
];

export const AppSidebar: React.FC<AppSidebarProps> = () =>
  <StyledAppSidebar>
    {menuItems.map(i => <SidebarLink key={i.text} to={i.to}>
      <Icon icon={i.icon} size="xbig" />
      <Text variant="h3">{i.text}</Text>
    </SidebarLink>)}
  </StyledAppSidebar>;
