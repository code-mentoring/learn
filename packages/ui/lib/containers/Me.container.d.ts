import { User } from '@codement/api';
export declare const Me: import("unstated-next").Container<{
    me: User | undefined;
    loading: boolean;
    called: boolean;
    error: import("apollo-client").ApolloError | undefined;
    refetch: (variables?: Record<string, any> | undefined) => Promise<import("apollo-client").ApolloQueryResult<{
        me: User;
    }>>;
}, void>;
