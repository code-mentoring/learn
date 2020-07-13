import React from 'react';

import { UserProfile } from './UserProfile';

export default {
  title: 'UserProfile',
  parameters: {
    info: { inline: true }
  }
};

export const Default = () => <UserProfile user="Test">Folke</UserProfile>;
