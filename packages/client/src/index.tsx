import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, SliderFieldStyles } from '@codement/ui';

import { ContainerWrapper } from '@codement/ui/lib/containers/Wrapper';
import { getClient } from '@codement/ui/lib/apollo';
import { TooltipStyles } from '@codement/ui/components/MenuPop/MenuPop.styles';
import { AppRouter } from './router/AppRouter';


(async () => {
  ReactDOM.render(
    <ApolloProvider client={await getClient()}>
      <ContainerWrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <TooltipStyles />
          <SliderFieldStyles />
          <AppRouter />
        </ThemeProvider>
      </ContainerWrapper>
    </ApolloProvider>,
    document.getElementById('app')
  );
})();
