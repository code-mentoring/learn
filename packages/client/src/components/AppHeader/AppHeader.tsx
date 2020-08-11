import { Icon, UserProfile } from '@codement/ui';
import LogoMark from '@codement/ui/images/logo-mark.svg';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import { Link } from 'react-router-dom';

import { Figure, Search, StyledAppHeader } from './AppHeader.styles';
import { PathSelector } from './PathSelector/PathSelector';


export interface AppHeaderProps {
  /* Only shows the logo and the user profile. Example of use: Welcome wizard */
  minimal?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ minimal }) => {
  const { me } = Me.useContainer();

  return <StyledAppHeader minimal={minimal}>
    <Link to="/dashboard">
      <LogoMark className="logo" />
    </Link>

    {!minimal && <>
      <Search size="small" placeholder="Search for anything…" iconColor="grey.700" icon="search" />
      <PathSelector />

      {/* TODO: Replace with concept icon */}
      <Figure color="green">
        <span>100</span>
        <Icon icon="fire" color="green" size="lg" />
      </Figure>

      <Figure color="tertiary">
        <span>{me?.streak}</span>
        <Icon icon="fire" color="tertiary" size="lg" />
      </Figure>

      {me && <UserProfile user={me} />}
    </>}
  </StyledAppHeader>;
};
