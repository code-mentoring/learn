import React from 'react';

import { Button } from './Button';

export default {
  title: 'Button',
  parameters: {
    info: { inline: true }
  }
};

export const Default = () => <Button>Test one</Button>;
export const newButton = () => <Button
  color="secondary"
  iconPosition="right"
  style={{ width: '150px', height: '200px' }}
>Test Two</Button>;
