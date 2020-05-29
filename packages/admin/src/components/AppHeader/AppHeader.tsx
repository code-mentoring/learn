import React from 'react';
import { Link } from 'react-router-dom';
import LogoMark from '@codement/ui/images/logo-mark.svg';

// TODO: Replace user profile picture when #27 is completed.
// TODO: Replace the class icon with the actual class the student is
// TODO: Fix points when the api is done (#26 ?)
// TODO: Add conditionals for things that are supposed to appear
//          depending on the page(ie.points, course)

export interface AppHeaderProps {
}

/**
 *
 * @param minimal minimal appheader only shows the logo and
 * the user profile. Example of use: Welcome wizard
 */
export const AppHeader: React.FC<AppHeaderProps> = () => (
  <nav className="border-b-2 border-solid border-grey-500 p-2 sm:p-4">
    <Link to="/dashboard">
      <LogoMark className="logo h-10 inline ml-1 sm:ml-20" />
    </Link>
    <div className="inline font-semibold float-right mr-1 sm:mr-16" />
  </nav>
);
