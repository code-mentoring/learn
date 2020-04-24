import React, { useEffect } from 'react';
import classnames from 'classnames';


export interface PageProps {
  title: string;
  type?: string;
  className?:string
}

export const Page: React.FunctionComponent<PageProps> = ({
  title,
  type,
  children,
  className
}) => {
  useEffect(() => { document.title = title; }, [title]);

  return <main className={classnames('absolute t-0 l-0 w-full h-full', type, className)}>{children}</main>;
};


export const PageContent: React.FunctionComponent = ({ children }) =>
  <div className="page-content">{children}</div>;
