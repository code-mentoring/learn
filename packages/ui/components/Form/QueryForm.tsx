import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import React from 'react';
import gql from 'graphql-tag';

import { Form, FormProps } from './Form';
import { removeKeys } from '../../lib/removeKeys';

export interface MutationFormProps extends FormProps<any> {
  mutation: string;
  variablesKey: string;
}
export interface QueryFormProps extends FormProps<any> {
  query: string;
  variablesKey: string;
}

export const MutationForm: React.FunctionComponent<MutationFormProps> = ({
  mutation,
  variablesKey,
  ...formProps
}) => {
  const [m] = useMutation(gql(mutation));
  return <Form
    {...formProps}
    onSubmit={
      v => m({ variables: { [variablesKey]: removeKeys(v, ['__typename']) } })
    }
  />;
};


export const QueryForm: React.FunctionComponent<QueryFormProps> = ({
  query,
  variablesKey,
  ...formProps
}) => {
  const [q] = useLazyQuery(gql(query));
  return <Form
    {...formProps}
    onSubmit={
      v => q({ variables: { [variablesKey]: removeKeys(v, ['__typename']) } })
    }
  />;
};
