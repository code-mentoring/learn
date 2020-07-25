declare type AuthStatus = 'signingIn' | 'signedIn' | 'signedOut' | 'verifying';
export declare const Auth: import("unstated-next").Container<{
    status: AuthStatus;
    checked: boolean;
    verify: () => Promise<void>;
    login: (email: string, password: string, rememberMe?: boolean, _redirect?: string | undefined) => void;
    loginError: import("apollo-client").ApolloError | undefined;
    loginLoading: boolean;
    signOut: () => void;
}, void>;
export {};
