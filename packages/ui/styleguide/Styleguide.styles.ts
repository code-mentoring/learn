import styled from 'styled-components';
import { Card } from '../components';
import { theme as t } from '../css/theme';

export const StyleguidePage = styled.main`
  display: grid;
  grid-template-columns: min-content 1fr;
  height: 100vh;
  background: ${t.color('grey.100')};
`;

export const StyleguideSidebar = styled.aside`
  padding: ${t.size()};
  background: ${t.color('white')};

  h3 {
    white-space: nowrap;
    margin-bottom: ${t.size('lg')};
  }

  a {
    color: ${t.color('primary.300')};
    margin-bottom: ${t.size()};
    &.active {
      color: ${t.color('primary')};
    }
  }
`;

export const StyleguideArticle = styled.article`
  padding: ${t.size()};
  max-width: 60rem;
  margin-left: ${t.size('massive')};
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  hr {
    margin: ${t.size('giant')} 0;
  }
  h1 {
    margin-bottom: ${t.size('lg')};
  }
  h2 {
    margin-bottom: ${t.size('tiny')};
  }
  p {
    margin-bottom: ${t.size('big')};
    code {
      background: ${t.colors.code.background};
      color: ${t.colors.code.color};
      font-family: ${t.fontFamily.code};
      border-radius: ${t.borderRadius.medium};
      padding: ${t.size('xtiny')};
    }
  }

  ${Card} {
    padding: ${t.size('lg')};
  }

  ${Card} + pre {
    position: relative;
    margin-top: -${t.size('tiny')};
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    z-index: 2;
  }
`;
