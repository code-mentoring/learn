import React, { useEffect } from 'react';
import classnames from 'classnames';
import { AppHeader } from '../AppHeader/AppHeader';

export interface PageProps {
  title: string;
  type?: string;
  header?: boolean;
  className?:string;
  sideBar?: boolean;
}

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  type,
  header = true,
  sideBar = true,
  children,
  className
}) => {
  useEffect(() => { document.title = title; }, [title]);

  return (
    <main
      className={classnames('absolute t-0 l-0 w-full h-full', type, className)}
      style={{ display: 'grid', gridTemplateColumns: '180px auto', gridTemplateRows: '80px auto' }}
    >
      {header && <AppHeader className="col-span-2" />}
      {sideBar && <div className="w-48">Side bar</div>}
      {children}
    </main>
  );
};


export const PageContent: React.FunctionComponent = ({ children }) => (
  <div className="page-content border-2 border-solid border-grey-500 bg-white rounded">{children}</div>
);
