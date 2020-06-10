import './css/base.css';

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';
import { theme } from '@codement/ui';

import { getClient } from '@codement/ui/lib/apollo';
import { ContainerWrapper } from '@codement/ui/lib/containers/Wrapper';
import { AppRouter } from './router/AppRouter';

(async () => {
  ReactDOM.render(
    <ApolloProvider client={await getClient()}>
      <ContainerWrapper>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </ContainerWrapper>
    </ApolloProvider>,
    document.getElementById('app')
  );
})();
