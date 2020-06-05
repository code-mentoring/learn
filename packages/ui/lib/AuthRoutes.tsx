import React from 'react';
import { Route, useHistory, RouteProps } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Auth } from './containers/Auth.container';
import { Me } from './containers/Me.container';


export const AuthRoute: React.FunctionComponent<
RouteProps & {routes: {[key: string]: () => {}}}
> = ({
  routes, ...props
}) => {
  const { status } = Auth.useContainer();
  const history = useHistory();
  const { loading, called } = Me.useContainer();

  if (status === 'signedOut') history.push(routes.login());
  if ((status === 'signingIn' || status === 'verifying') || !called || loading) return <Loader />;

  return <Route {...props} />;
};

export const UnAuthRoute: React.FunctionComponent<
RouteProps & {routes: {[key: string]: () => {}}}
> = (
  { routes, ...props }
) => {
  const { status } = Auth.useContainer();
  const history = useHistory();

  if (status === 'verifying') return <Loader />;
  if (status === 'signedIn') history.push(routes.home() || routes.admins());
  return <Route {...props} />;
};
