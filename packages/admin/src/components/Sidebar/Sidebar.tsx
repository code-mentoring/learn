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

  return (
    <nav className="flex flex-col justify-center border-2 h-full text-left w-48 pl-4">
      <Link to="/dashboard">
        <LogoMark className="logo h-10 absolute top-0 mt-4" />
      </Link>
      <Link to="/admins" className="text-lg font-semibold text-primary-500">
        <Icon icon="plus" size={8} className="inline mb-1" />Admins
      </Link>
      <Link to="/paths" className="text-lg font-semibold text-grey-500">
        <Icon icon="plus" size={8} className="inline mb-1" />Paths
      </Link>
      <Link to="/questions" className="text-lg font-semibold text-grey-500">
        <Icon icon="plus" size={8} className="inline mb-1" />Questions
      </Link>
      <Link to="/settings" className="text-lg font-semibold text-grey-500">
        <Icon icon="plus" size={8} className="inline mb-1" />Settings
      </Link>
      <footer className="absolute bottom-0 px-4 mb-2 border-2 border-grey-200 rounded">
        <button
          type="button"
          className="my-2 font-semibold text-primary-500 text-xs"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img
            className="rounded-circle cursor-pointer h-8 inline "
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
