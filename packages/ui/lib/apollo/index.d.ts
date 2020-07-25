import { ApolloClient, ApolloError } from 'apollo-client';
export declare const getClient: () => Promise<ApolloClient<any>>;
export declare const getGQLError: (err?: ApolloError | ApolloError[] | undefined) => string | undefined;
