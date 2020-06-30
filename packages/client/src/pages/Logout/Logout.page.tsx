import { Loader } from '@codement/ui';
import React, { useEffect } from 'react';

import { Auth } from '@codement/ui/lib/containers/Auth.container';


export const LogoutPage = () => {
  const { signOut } = Auth.useContainer();
  useEffect(() => signOut(), []);
  return <Loader />;
};
