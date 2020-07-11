import React from 'react';
import { IconLogout } from './cil-account-logout';
import { IconMinus } from './cil-minus';
import { IconPage } from './cil-page';
import { IconUser } from './cil-user';

export default {
  title: 'Linear Icons',
  paramters: {
    info: { inline: true }
  }
};

export const LogoutIcone = () => <IconLogout />;
export const MinusIcon = () => <IconMinus />;
export const PageIcon = () => <IconPage />;
export const UserIcon = () => <IconUser />;
