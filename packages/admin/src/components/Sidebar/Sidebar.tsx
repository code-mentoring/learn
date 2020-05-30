import React, { useState } from 'react';
import { Me } from '@codement/ui/lib/containers/Me.container';
import { Link } from 'react-router-dom';
import { Icon } from '@codement/ui';
import LogoMark from '@codement/ui/images/logo-mark.svg';
import { DropdownMenu } from '../../../../client/src/components/DropdownMenu/DropdownMenu';

export interface SidebarProps { }

export const Sidebar: React.FC<SidebarProps> = () => {
  const { me } = Me.useContainer();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuList = [
    { path: 'admins', icon: 'shield' },
    { path: 'paths', icon: 'path' },
    { path: 'questions', icon: 'question' },
    { path: 'settings', icon: 'settings' }
  ];

  // TODO: Update styling to match selected link.

  return (
    <nav className="flex flex-col justify-center h-full w-48 pl-4 text-left text-lg font-semibold text-primary-500">
      <Link to="/dashboard">
        <LogoMark className="logo h-10 absolute top-0 mt-4" />
      </Link>
      {menuList.map(({ path, icon }) => (
        <Link to={`/${path}`} className="text-lg font-semibold text-primary-500">
          <Icon icon={icon} size={6} className="inline mb-1 mr-2" />{path.charAt(0).toUpperCase() + path.slice(1)}
        </Link>
      ))}

      <footer className="absolute bottom-0 px-4 mb-2 border-2 border-grey-200 rounded h-10">
        <button
          type="button"
          className="font-semibold text-primary-500 text-xs"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img
            className="rounded-circle cursor-pointer h-8 inline"
            src={me?.profileImage}
            alt="User profile pic"
          />{me?.firstName}
          <Icon icon="chevronDown" className="inline text-grey-200" size={6} />
        </button>
        {showProfileMenu && (
          <DropdownMenu
            title="My Account"
            data={me}
            subjects={['Logout']}
            className="absolute bg-white flex flex-col"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
        )}
      </footer>
    </nav>
  );
};
