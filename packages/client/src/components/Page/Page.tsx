import React, { useEffect } from 'react';
import styled from 'styled-components';

import { AppHeader } from '../AppHeader/AppHeader';


export interface PageProps {
  title: string;
  header?: boolean;
  className?: string
}

const StyledPage = styled.main`
  position: absolute;
  top:0; left: 0; width: 100%; height: 100%;
`;

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  header = true,
  children,
  className
}) => {
  useEffect(() => { document.title = title; }, [title]);

  return <StyledPage className={className}>
    {header && <AppHeader />}
    {children}
  </StyledPage>;
};


// TODO: Refactor/remove this
export const PageContent: React.FunctionComponent = ({ children }) => (
  <div className="page-content">{children}</div>
);
