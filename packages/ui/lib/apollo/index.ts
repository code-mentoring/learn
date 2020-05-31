/* eslint-disable no-console, no-underscore-dangle */
import fragments from '@codement/api/fragments.json';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloError } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import axios from 'axios';

import { CONFIG } from './config';
import { LocalStorage } from '../localStorage';


const { buildAxiosFetch } = require('@lifeomic/axios-fetch');

const getFragmentMatcher = async () =>
  new IntrospectionFragmentMatcher({
    introspectionQueryResultData: fragments
  });

const authLink = setContext((_, ctx) => {
  const { token } = LocalStorage;
  return {
    headers: {
      ...ctx.headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const uploadLink = createUploadLink({
  uri: `${CONFIG.apiHost}${CONFIG.apiUrl}`,
  fetch: buildAxiosFetch(axios, (config: any, _input: any, init: any) => ({
    ...config,
    onUploadProgress: init.onUploadProgress
  })),
  credentials: 'include'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});


const getCache = async () =>
  new InMemoryCache({
    dataIdFromObject: (object: any) => {
      switch (object.__typename) {
        default:
          if (object.id) return `${object.__typename}.${object.id}`;
      }
      return null;
    },
    fragmentMatcher: await getFragmentMatcher()
  });

let client: ApolloClient<any>;

export const getClient = async () => {
  if (client) return client;
  client = new ApolloClient({
    link: authLink.concat(
      ApolloLink.from([
        errorLink,
        uploadLink
      ])
    ),
    cache: await getCache()
  });
  return client;
};


export const getGQLError = (err?: ApolloError | ApolloError[]) => {
  if (!err) return;
  const gqlE = (err instanceof Array) ? err[0] : err;
  return gqlE.graphQLErrors[0].message;
};
