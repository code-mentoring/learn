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

html {
  color:  ${props => props.theme.colors.primary[500]};
  }
  
  h1,h2,h3 {
    font-family: "Open Sans", helvetica, sans-serif;
    color: ${props => props.theme.colors.primary[500]};
  }
  
  h1{
    font-size: 1.5rem;
    font-weight: 800;
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.25;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1.25;
  }
  
  h4 {
    font-size: .875rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${props => props.theme.colors.grey[700]};
  }
  
  p {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${props => props.theme.colors.grey[700]};
  }
`;
