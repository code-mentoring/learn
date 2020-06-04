import './css/base.css';

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@codement/ui';

import { ContainerWrapper } from '@codement/ui/lib/containers/Wrapper';
import { getClient } from '@codement/ui/lib/apollo';
import { AppRouter } from './router/AppRouter';
import { ClientContainerWrapper } from './ClientContainerWrapper';


(async () => {
  ReactDOM.render(
    <ApolloProvider client={await getClient()}>
      <ContainerWrapper>
        <ClientContainerWrapper>
          <ThemeProvider theme={theme}>
            <AppRouter />
          </ThemeProvider>
        </ClientContainerWrapper>
      </ContainerWrapper>
    </ApolloProvider>,
    document.getElementById('app')
  );
})();
