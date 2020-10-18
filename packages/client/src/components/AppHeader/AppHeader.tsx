import { Icon, UserProfile, Text } from '@codement/ui';
import LogoMark from '@codement/ui/images/logo-new.svg';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import { CurrentProgressWidget } from '../widgets/PathProgress/CurrentPathProgress.widget';
import { CenterPosition, Figure, StyledAppHeader } from './AppHeader.styles';
import { Menu, DropdownMenu } from './DropdownMenu';

export interface AppHeaderProps {
  /* Only shows the logo and the user profile. Example of use: Welcome wizard */
  minimal?: boolean;
}

const userDropdownMenu: Menu[] = [
  {
    title: 'home',
    link: routes.home()
  },
  {
    title: 'my profile',
    link: routes.profile()
  },
  {
    title: 'logout',
    link: routes.logout()
  }
];

export const AppHeader: React.FC<AppHeaderProps> = ({ minimal }) => {
  const { me } = Me.useContainer();

  return <StyledAppHeader minimal={minimal} className="appHeader">
    <Link to="/dashboard">
      <LogoMark className="logo" />
    </Link>

    {!minimal && <>
      <CenterPosition>
        <CurrentProgressWidget />
      </CenterPosition>
      {/* TODO: Replace with concept icon */}
      <Figure color="secondary.500" background="secondary.200">
        <Icon icon="puzzle" color="secondary.500" size="big" />
        <span>100</span>
      </Figure>

      <Figure color="tertiary.500" background="tertiary.200">
        <Icon icon="fire" color="tertiary.500" size="big" />
        <span>{me?.streak}</span>
      </Figure>

      {me
        && <DropdownMenu menu={userDropdownMenu}>
          <UserProfile user={me} />
          <Text variant="small">{me.firstName}</Text>
          <Icon icon="chevronDown" color="grey.300" size="xsm" />
        </DropdownMenu>
      }
    </>}
  </StyledAppHeader>;
};
