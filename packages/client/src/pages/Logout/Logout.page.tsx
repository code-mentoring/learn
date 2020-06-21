import { Loader } from '@codement/ui';
import React, { useEffect } from 'react';

import { Auth } from '@codement/ui/lib/containers/Auth.container';


export const LogoutPage = () => {
  const { signOut, client } = Auth.useContainer();
  signOut();
  useEffect(() => {
    async function clearCache() {
      await client.clearStore();
    }
    clearCache();
  }, []);
  return <Loader />;
};
