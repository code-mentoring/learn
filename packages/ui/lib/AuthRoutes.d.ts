import React from 'react';
import { RouteProps as RP } from 'react-router-dom';
export declare type RouteProps = RP & {
    routes: {
        [key: string]: () => {};
    };
    loadingPage?: React.ReactElement;
};
export declare const AuthRoute: React.FC<RouteProps>;
export declare const UnAuthRoute: React.FC<RouteProps>;
