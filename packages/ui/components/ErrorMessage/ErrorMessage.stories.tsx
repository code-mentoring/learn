import React from 'react';
// import styled from 'styled-components';
import { ErrorMessage } from './ErrorMessage';
// import { theme as t } from '../../css/theme';

export default {
  title: 'ErrorMessage',
  parameters: {
    info: { inline: true }
  }
};

export const Default = () => <ErrorMessage
  error="Error Message"
  style={{
    display: 'block',
    textAlign: 'center'

  }}
>Test</ErrorMessage>;
