import styled from 'styled-components';
import { Card } from '../components';
import { theme } from '../css/theme';

export const StyleguidePage = styled.main`
  display: grid;
  grid-template-columns: min-content 1fr;
  height: 100vh;
  background: ${theme.color('grey.100')};
`;

export const StyleguideSidebar = styled.aside`
  padding: ${theme.size()};
  background: ${theme.color('white')};

  h3 {
    white-space: nowrap;
    margin-bottom: ${theme.size('lg')};
  }

  a {
    color: ${theme.color('primary.300')};
    &.active {
      color: ${theme.color('primary')};
    }
  }
`;

export const StyleguideArticle = styled.article`
  padding: ${theme.size()};
  max-width: 60rem;
  margin-left: ${theme.size('massive')};
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  hr {
    margin: ${theme.size('giant')} 0;
  }
  h1 {
    margin-bottom: ${theme.size('lg')};
  }
  h2 {
    margin-bottom: ${theme.size('tiny')};
  }
  p {
    margin-bottom: ${theme.size('big')};
    code {
      background: ${theme.colors.code.background};
      color: ${theme.colors.code.color};
      font-family: ${theme.fontFamily.code};
      border-radius: ${theme.borderRadius.medium};
      padding: ${theme.size('xtiny')};
    }
  }

  ${Card} {
    padding: ${theme.size('lg')};
  }

  ${Card} + pre {
    position: relative;
    margin-top: -${theme.size('tiny')};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    z-index: 2;
  }
`;
