import { Button, Emoji, Form, FormField, Text, Box } from '@codement/ui';
import Logo from '@codement/ui/images/logo.svg';
import People from '@codement/ui/images/welcome-people.svg';
import { getGQLError } from '@codement/ui/lib/apollo';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { LocalStorage } from '@codement/ui/lib/localStorage';
import React from 'react';
import styled, { css } from 'styled-components';
import * as yup from 'yup';

import { Page } from '../../components/Page/Page';

const StyledPage = styled(Page)`${({ theme: t }) => css`
  display: grid;
  margin-top: ${t.size('xbig')};
  grid-template-rows: ${t.size('huge')} 1fr;
  justify-content: center;
  text-align: center;
  align-items: center;

  form {
    width: 40rem;
    margin: ${t.size('huge')} 0;
  }

  & > svg:first-child { margin: auto; }

  form + small {
    display: block;
  }
`}`;

const Container = styled(Box)`
  margin-top: -20rem;
`;

const StyledPeople = styled(People)`
  position: fixed;
  bottom:0; left:0; height: 22rem;
  opacity: 0.2;
`;


const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});


export const LoginPage = () => {
  const { login, loginError } = Auth.useContainer();

  const submit = (e: { email: string, password: string, rememberMe: boolean }) => {
    login(e.email, e.password, e.rememberMe);
  };

  return <StyledPage title="Login to Code Mentoring" header={false}>
    <a href="https://codementoring.co">
      <Logo className="logo h-12 inline m-6" />
    </a>

    <Container>
      <Text as="h1">Welcome back!</Text>
      <Text>Let&apos;s get coding <Emoji text="😊" /></Text>

      <Form
        className="max-w-xs mx-auto"
        onSubmit={submit}
        error={getGQLError(loginError)}
        validationSchema={loginValidation}
        initialValues={{
          email: LocalStorage.email || undefined
        }}
      >
        <FormField className="mb-2" name="email" type="text" placeholder="Email" icon="user" />
        <FormField name="password" placeholder="Password" type="password" icon="password" />
        <FormField className="mb-2" type="checkbox" name="rememberMe" text="Remember me?" />
        <Button size="large">Login</Button>
      </Form>

      <Text as="small">
        New to Code Mentoring? <a href="https://codementoring.co/signup" className="text-primary-500">Join now</a>
      </Text>
    </Container>

    <StyledPeople />
  </StyledPage>;
};
