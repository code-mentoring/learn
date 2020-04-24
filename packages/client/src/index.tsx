import './css/base.css';

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import { getClient } from './lib/apollo';
import { AppRouter } from './router/AppRouter';
import { ContainerWrapper } from './containers/Wrapper';

(async () => {
  ReactDOM.render(
    <ApolloProvider client={await getClient()}>
      <ContainerWrapper>
        <AppRouter />
      </ContainerWrapper>
    </ApolloProvider>,
    document.getElementById('app')
  );
})();
