import React from 'react';
import { QueryForm } from './QueryForm';

export default {
  title: 'QueryForm',
  parameters: {
    info: { inline: true }
  }
};

export const Default = () => <QueryForm query="" variablesKey="" />;
