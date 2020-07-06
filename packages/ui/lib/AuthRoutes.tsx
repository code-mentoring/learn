import React from 'react';
import { Redirect, Route, RouteProps as RP } from 'react-router-dom';

import { Loader } from '../components/Loader/Loader';
import { Auth } from './containers/Auth.container';
import { Me } from './containers/Me.container';


export type RouteProps = RP & {
  routes: { [key: string]: () => {} }
}

export const AuthRoute: React.FC<RouteProps> = ({
  routes, children
}) => {
  const { status } = Auth.useContainer();
  const { loading, called } = Me.useContainer();

  if (status === 'signedOut') return <Redirect to={routes.login()} />;
  if ((status === 'signingIn' || status === 'verifying') || !called || loading) return <Loader />;

  return <>{children}</>;
};


export const UnAuthRoute: React.FC<RouteProps> = ({
  routes,
  ...props
}) => {
  const { status } = Auth.useContainer();

  if (status === 'verifying') return <Loader />;
  if (status === 'signedIn') return <Redirect to={routes.home() || routes.admins()} />;

  return <Route {...props} />;
};
