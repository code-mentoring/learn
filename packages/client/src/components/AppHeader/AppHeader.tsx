import { Icon, UserProfile, Text } from '@codement/ui';
import LogoMark from '@codement/ui/images/logo-new.svg';
import { Me } from '@codement/ui/lib/containers/Me.container';
import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentProgressWidget } from '../widgets/PathProgress/CurrentPathProgress.widget';
import { CenterPosition, Figure, StyledAppHeader, User } from './AppHeader.styles';

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
        && <User>
          <UserProfile user={me} />
          <Text variant="small">{me.firstName}</Text>
          {/* TODO: Add dropdown menu */}
          <button type="button">
            <Icon icon="chevronDown" color="grey.300" size="xsm" />
          </button>
        </User>}
    </>}
  </StyledAppHeader>;
};
