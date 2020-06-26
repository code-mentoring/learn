// TODO: Move all these into a Type component
import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`${({ theme: t }) => css`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,800;1,400&display=swap');
*, *:focus {
  outline: none !important;
  box-sizing: border-box;
}

html {
  font-size: 10px;
  font-family: ${t.fontFamily.sans};
}

body, #app {
  background: #fff;
  min-height: 100vh;
}
`}`;
