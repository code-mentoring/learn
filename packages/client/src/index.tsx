import { ApolloProvider } from '@apollo/react-hooks';
import { GlobalStyle, SliderFieldStyles, theme } from '@codement/ui';
import { TooltipStyles } from '@codement/ui/components/MenuPop/MenuPop.styles';
import { CodeStyle } from '@codement/ui/css/code';
import { getClient } from '@codement/ui/lib/apollo';
import { ContainerWrapper } from '@codement/ui/lib/containers/Wrapper';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { AppRouter } from './router/AppRouter';


(async () => {
  ReactDOM.render(
    <ApolloProvider client={await getClient()}>
      <ContainerWrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <TooltipStyles />
          <SliderFieldStyles />
          <CodeStyle />
          <AppRouter />
        </ThemeProvider>
      </ContainerWrapper>
    </ApolloProvider>,
    document.getElementById('app')
  );
})();
