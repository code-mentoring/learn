import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
*, *:focus {
  outline: none !important;
}

body, #app {
  background: #e4e0f3;
  min-height: 100vh;
  /* fallback */
  /* font-size: 10px; */
  /* font-size: 62.5%;  TODO: uncomment when transition to styled components is finished */ 
}
`;
