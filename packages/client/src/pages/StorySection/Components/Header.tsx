import React from 'react';
import { Icon } from '@codement/ui';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import LogoMark from '../../../images/logo-mark.svg';

export interface HeaderProps {
  pathName: string;
}

export const Header: React.FC<HeaderProps> = ({ pathName = useLocation() }) =>

  <nav className="flex justify-between items-center p-2 sm:p-4">
    <Link to="/dashboard">
      <LogoMark className="logo h-10 sm:ml-10" />
    </Link>
    <h4>{pathName.pathname}</h4>
    <div className="sm:mr-10">
      <Link to="/dashboard">
        <Icon className="h-10 text-grey-300" icon="x" />
      </Link>
    </div>
  </nav>;
