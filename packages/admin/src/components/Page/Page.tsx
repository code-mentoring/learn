import React, { useEffect } from 'react';
import classnames from 'classnames';
import { AppHeader } from '../AppHeader/AppHeader';


export interface PageProps {
  title: string;
  type?: string;
  header?: boolean;
  sider?: boolean;
  className?:string
}

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  type,
  header = true,
  sider = true,
  children,
  className
}) => {
  useEffect(() => { document.title = title; }, [title]);

  return (
    <main
      className={classnames('absolute t-0 l-0 w-full h-full', type, className)}
    >
      {header && <AppHeader /> }
      // TODO: to be repaced by AdminSiderBar
      {sider && <AppHeader />}
      {/* {sider && <AdminLeftSideBar />} */}
      <div className="flex border border-grey-300 rounded bg-grey-100 m-5 h-full">
        {children}
      </div>
    </main>
  );
};

export const PageContent: React.FunctionComponent = ({ children }) => (
  <div className="page-content">{children}</div>
);
