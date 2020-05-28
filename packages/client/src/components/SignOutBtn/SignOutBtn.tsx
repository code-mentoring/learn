import React from 'react';

import { Auth } from '../../containers/Auth.container';
import {Button} from '../../../../ui/components/Button/Button'

export const SignOutBtn = () => {
  const { signOut } = Auth.useContainer();
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </Button>
  );
};
