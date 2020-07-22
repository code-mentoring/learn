import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../css/theme';
import { GlobalStyle } from '../css/base';
import { TooltipStyles } from '../components/MenuPop/MenuPop.styles';
import { SliderFieldStyles } from '../components/SliderField/SliderField.styles';
import { Styleguide } from './Styleguide';
import { CodeStyle } from '../css/code';

(async () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TooltipStyles />
      <SliderFieldStyles />
      <Styleguide />
      <CodeStyle />
    </ThemeProvider>,
    document.getElementById('app')
  );
})();
