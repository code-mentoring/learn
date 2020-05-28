import React from 'react';

import { Auth } from '../../containers/Auth.container';

export const SignOutBtn = () => {
  const { signOut } = Auth.useContainer();
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
};
