import { Loader } from '@code-mentoring/ui';
import React from 'react';

import { Auth } from '../../containers/Auth.container';


export const LogoutPage = () => {
  const { signOut } = Auth.useContainer();
  signOut();
  return <Loader />;
};
