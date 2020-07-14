import React from 'react';

import { Button } from './Button';

export default {
  title: 'Button',
  parameters: {
    info: { inline: true }
  }
};

export const ButtonWithIcon = () => <Button
  text={false}
  color="primary"
  disabled={false}
  size="large"
  icon="fire"
  iconPosition="left"
/>;

export const ButtonWithText = () => <Button color="tertiary" disabled={false} size="large">Text Here</Button>;
