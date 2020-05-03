import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, PathIcon } from '@code-mentoring/ui';
import LogoMark from '../../images/logo-mark.svg';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { Me } from '../../containers/Me.container';
import styles from './AppHeader.module.css';

// TODO: Replace user profile picture when #27 is completed.
// TODO: Replace the class icon with the actual class the student is
// TODO: Fix points when the api is done (#26 ?)
// TODO: Add conditionals for things that are supposed to appear
//          depending on the page(ie.points, course)

export const AppHeader: React.FC = () => {
  const { me } = Me.useContainer();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPathMenu, setShowPathMenu] = useState(false);

  const paths = ['HTML5', 'JavaScript', 'React'];
  const menuItems = ['Profile', 'Settings', 'Help', 'Logout'];

  return (
    <nav className="border-b-2 border-solid border-grey-500 p-2 sm:p-4">
      <Link to="/dashboard">
        <LogoMark className="logo h-10 inline ml-1 sm:ml-20" />
      </Link>

      <div className="inline text-grey-700 font-bold text-sm uppercase">
        <Link to="/friends" className="mx-3">
          Friends
        </Link>
      </div>

      <div className="inline-flex items-center font-semibold float-right mr-1 sm:mr-16">
        <PathIcon
          icon="js"
          size="medium"
          className="inline cursor-pointer"
          onMouseEnter={() => setShowPathMenu(true)}
          onMouseLeave={() => setShowPathMenu(false)}
          onClick={() => setShowPathMenu(!showPathMenu)}
        />
        {showPathMenu && (
          <DropdownMenu
            title="My Paths"
            subjects={paths}
            className={`absolute bg-white flex flex-col ${styles.paths}`}
            onMouseEnter={() => setShowPathMenu(true)}
            onMouseLeave={() => setShowPathMenu(false)}
            onClick={() => setShowPathMenu(!showPathMenu)}
          />
        )}

        <div className="text-tertiary-500 inline ml-8 mr-8">
          <span className="text-lg">5</span>
          <Icon icon="fire" size="small" className="inline ml-1 mb-1" />
        </div>

        <button
          type="button"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img
            className="rounded-circle inline-block cursor-pointer h-10"
            src={me?.profileImage}
            alt="User profile pic"
          />
        </button>
        {showProfileMenu && (
          <DropdownMenu
            title="My Account"
            subjects={menuItems}
            data={me}
            className={`absolute top-20 left-20 bg-white flex flex-col ${styles.menu}`}
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
        )}
      </div>
    </nav>
  );
};
