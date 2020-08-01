import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { UserInput, MutationCreateUserArgs } from '@codement/api';
import { history } from '../history';

type CreationStatus = 'signingUp' | 'signedUp';

const createUserMutation = gql`
mutation($user: UserInput!) {
  createUser(user: $user) {
    email
  }
}`;

const useUser = () => {
  const [createUserFunc, { data: createUserData, error: signupError, loading: signupLoading }] = useMutation<
    { user: UserInput },
    MutationCreateUserArgs>(createUserMutation);

  const [status, setStatus] = useState<CreationStatus>('signingUp');
  const [redirect, setRedirect] = useState<string | null>(null);

  const signup = (
    user: UserInput,
    _redirect?: string
  ) => {
    if (_redirect) setRedirect(_redirect);

    createUserFunc({ variables: { user } });
  };

  const signupDone = () => {
    setStatus('signedUp');
    if (redirect) {
      history.push(redirect);
      setRedirect(null);
    }
  };
  useEffect(() => createUserData && signupDone(), [createUserData]);

  return {
    status,
    signup,
    signupError,
    signupLoading
  };
};

export const User = createContainer(useUser);
