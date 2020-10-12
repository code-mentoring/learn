import { theme as t } from '@codement/ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { AppHeader } from '../AppHeader/AppHeader';
import { AppSidebar } from '../AppSidebar/AppSidebar';


export interface PageProps {
  title: string;
  header?: boolean;
  sidebar?: boolean;
  twoSidebar?: boolean;
  className?: string;
}

const StyledPage = styled.main<{ sidebar?: boolean, twoSidebar?: boolean, header?: boolean }>`
  position: absolute;
  top:0; left: 0; width: 100%; height: 100%;

  ${p => p.sidebar && `
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 25rem 1fr;
  `}

  ${p => p.twoSidebar && `
    display: grid;
    grid-template-columns: 28rem 1fr 28rem;
    grid-gap: ${t.size('none')};
    height:100%;
  `}

  ${p => p.twoSidebar && p.header && `
    grid-template-rows: min-content 1fr;
  `} 

  .appHeader {
    grid-column: span 3;
  }
`;

const StyledPageContent = styled.div`
  background: ${t.color('primary.100')};
  border-top-left-radius: ${t.borderRadius.large};
  // padding: ${t.size('xbig')};
`;

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  header = false,
  sidebar = false,
  twoSidebar = false,
  children,
  className
}) => {
  useEffect(() => { document.title = title; }, [title]);

  // TODO: Page level query for better data optimization.
  // Would be great to get each page down to one API call for load

  return <StyledPage
    sidebar={sidebar}
    twoSidebar={twoSidebar}
    header={header}
    className={className}
  >
    {header && <AppHeader />}
    {sidebar && <AppSidebar />}
    {children}
  </StyledPage>;
};


export const AppPageContent = StyledPageContent;
