import { theme as t } from '@codement/ui';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { AppHeader } from '../AppHeader/AppHeader';
import { AppSidebar } from '../AppSidebar/AppSidebar';

export interface PageProps {
  title: string;
  header?: boolean;
  sidebar?: boolean;
  className?: string;
}

const StyledPage = styled.main<{ sidebar?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${(p) =>
    p.sidebar &&
    `
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 25rem 1fr;
  `}
`;

const StyledPageContent = styled.div`
  background: ${t.color('primary.100')};
  border-top-left-radius: ${t.borderRadius.large};
  padding: ${t.size('xbig')};
`;

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  header = false,
  sidebar = false,
  children,
  className,
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <StyledPage sidebar={sidebar} className={className}>
      {header && <AppHeader />}
      {sidebar && <AppSidebar />}
      {children}
    </StyledPage>
  );
};

export const AppPageContent = StyledPageContent;
