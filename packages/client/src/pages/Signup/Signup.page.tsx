import { useMutation } from '@apollo/react-hooks';
import { MutationCreateUserArgs, UserInput, Mutation } from '@codement/api';
import { Box, Button, Emoji, Form, FormField, Text, theme as t } from '@codement/ui';
import Logo from '@codement/ui/images/logo.svg';
import People from '@codement/ui/images/welcome-people.svg';
import { getGQLError } from '@codement/ui/lib/apollo';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { LocalStorage } from '@codement/ui/lib/localStorage';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { Page } from '../../components/Page/Page';
import { routes } from '../../router/routes';


const StyledPage = styled(Page)`
  display: grid;
  margin-top: ${t.size('xbig')};
  grid-template-rows: ${t.size('huge')} 1fr;
  justify-content: center;
  text-align: center;
  align-items: center;

  h1 {
    margin-bottom: ${t.size('lg')};
  }

  form {
    margin: ${t.size('huge')} auto;
    max-width: 40rem;
  }

  & > svg:first-child {
    margin: auto;
  }

  form + small {
    display: block;
  }
`;

const Container = styled(Box)`
  margin-top: -20rem;
  z-index: 2;
  width: 90vw;
  max-width: 50rem;

  @media (max-width: 600px) {
    margin-top: -5rem;
  }
`;

const StyledPeople = styled(People)`
  position: fixed;
  bottom:0; left:0; height: 22rem;
  opacity: 0.2;
  z-index: 1;

  @media (max-width: 600px) {
    bottom:0; left:0; height: 16rem;
  }
`;

const signupValidation = yup.object().shape({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password')
});


const createUserMutation = gql`
mutation($user: UserInput!) {
  createUser(user: $user) {
    email
  }
}`;


export const SignupPage = () => {
  const { login } = Auth.useContainer();
  const [newUser, setNewUser] = useState<UserInput>();

  const [signup, { data, error, loading }] = useMutation<
    { createUser: Mutation['createUser'] },
    MutationCreateUserArgs
  >(createUserMutation);

  const submit = async (user: UserInput) => {
    setNewUser(user);
    await signup({ variables: { user } });
  };

  // Once user has signed up, and it's returned, log user in
  useEffect(() => {
    if (data?.createUser && newUser) login(newUser.email, newUser.password);
  }, [data, newUser]);

  return (
    <StyledPage title="Signup to Code Mentoring">
      <a href="https://codementoring.co">
        <Logo />
      </a>

      <Container>
        <Text variant="h1">Start learning how to code today!</Text>
        <Text>
          You&apos;ll see how easy it really is <Emoji text="😊" />. Fill out your
          details below to join our community and platform.
        </Text>

        <Form
          onSubmit={submit}
          error={getGQLError(error)}
          validationSchema={signupValidation}
          initialValues={{
            email: LocalStorage.email || undefined
          }}
        >
          <FormField name="firstName" type="text" placeholder="First Name" icon="user" disabled={loading} />
          <FormField name="lastName" type="text" placeholder="Last Name" icon="user" disabled={loading} />
          <FormField name="email" type="text" placeholder="Email" icon="user" disabled={loading} />
          <FormField name="password" placeholder="Password" type="password" icon="password" disabled={loading} />
          <Button size="large" disabled={loading}>Signup</Button>
        </Form>

        <Text variant="small">
          Already have an account? <Link to={routes.login()}>Sign in here</Link>
        </Text>
      </Container>

      <StyledPeople />
    </StyledPage>
  );
};
