import { Box, Button, Emoji, Form, FormField, Text, theme as t } from '@codement/ui';
import Logo from '@codement/ui/images/logo.svg';
import People from '@codement/ui/images/welcome-people.svg';
import { getGQLError } from '@codement/ui/lib/apollo';
import { User } from '@codement/ui/lib/containers/User.container';
import { LocalStorage } from '@codement/ui/lib/localStorage';
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';

import { Page } from '../../components/Page/Page';

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
    width: 90vw;
    max-width: 40rem;
    margin: ${t.size('huge')} 0;
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


export const SignupPage = () => {
  const { signup, signupError } = User.useContainer();

  const submit = async (e: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rememberMe: boolean
  }) => {
    await signup(e);
  };

  return (
    <StyledPage title="Signup to Code Mentoring">
      <a href="https://codementoring.co">
        <Logo />
      </a>

      <Container>
        <Text variant="h1">Start learning how to code today!</Text>
        <Text>
          You&apos;ll see how easy it really is <Emoji text="😊" />. Fill out your <br />
          details below to join our community and platform.
        </Text>

        <Form
          onSubmit={submit}
          error={getGQLError(signupError)}
          validationSchema={signupValidation}
          initialValues={{
            email: LocalStorage.email || undefined
          }}
        >
          <FormField
            name="firstName"
            type="text"
            placeholder="First Name"
            icon="user"
          />
          <FormField
            name="lastName"
            type="text"
            placeholder="Last Name"
            icon="user"
          />
          <FormField name="email" type="text" placeholder="Email" icon="user" />
          <FormField
            name="password"
            placeholder="Password"
            type="password"
            icon="password"
          />
          <FormField type="checkbox" name="rememberMe" text="Remember me?" />
          <Button size="large">Signup</Button>
        </Form>

        <Text variant="small">
          Already have an account?{' '}
          <a href="https://codementoring.co/login">Sign in here</a>
        </Text>
      </Container>

      <StyledPeople />
    </StyledPage>
  );
};
