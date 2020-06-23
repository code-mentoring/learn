import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import LogoMark from '@codement/ui/images/logo-mark.svg';
import { routes } from '../../router/routes';


export const AppHeader: React.FC<{className?: string}> = ({ className }) => (
  <nav className={classnames('p-2 sm:p-4', className)}>
    <Link to="/dashboard">
      <LogoMark className="logo h-10 inline ml-1 sm:ml-20" />
    </Link>
    <Link to={routes.logout()}>Logout</Link>
  </nav>
);
