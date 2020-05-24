import React from 'react';
import { Icon } from '@codement/ui';
import { Link } from 'react-router-dom';

import LogoMark from '../../images/logo-mark.svg';

export interface LessonHeaderProps {
  pathName: string;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({ pathName }) =>
  <nav className="flex justify-between items-center p-2 sm:p-4">
    <Link to="/">
      <LogoMark className="logo h-10 sm:ml-10" />
    </Link>
    <h4>{pathName}</h4>
    <div className="sm:mr-10">
      <Link to="/dashboard">
        <Icon className="h-10 text-grey-300" icon="x" />
      </Link>
    </div>
  </nav>;
