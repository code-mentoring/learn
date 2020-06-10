import React, { useEffect } from 'react';
import classnames from 'classnames';
import { AppHeader } from '../AppHeader/AppHeader';

export interface PageProps {
  title: string;
  type?: string;
  header?: boolean;
  className?:string;
  sideBar?: boolean;
  styles?: React.CSSProperties;
}

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  type,
  header = true,
  sideBar = true,
  children,
  className,
  styles
}) => {
  useEffect(() => { document.title = title; }, [title]);

  return (
    <main
      className={classnames('absolute t-0 l-0 w-full h-full', type, className)}
      style={styles}
    >
      {header && <AppHeader className="col-span-2" />}
      {sideBar && <div className="w-48">Side bar</div>}
      {children}
    </main>
  );
};


export const PageContent: React.FunctionComponent<{styles: React.CSSProperties}> = ({
  children, styles
}) => (
  <div className="page-content" style={styles}>
    <div
      className=" border-4 border-solid border-grey-200 bg-white rounded"
      style={{ padding: '2rem', position: 'absolute', width: '100%', height: '100%', overflow: 'auto' }}
    >
      {children}
    </div>
  </div>
);
