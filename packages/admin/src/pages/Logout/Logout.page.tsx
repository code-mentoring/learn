import { Loader } from '@codement/ui';
import React from 'react';

import { Auth } from '@codement/ui/lib/containers/Auth.container';


export const LogoutPage = () => {
  const { signOut } = Auth.useContainer();
  signOut();
  return <Loader />;
};
