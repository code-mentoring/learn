import { Box, Button, Emoji, Form, FormField, Text, theme as t } from '@codement/ui';
import Logo from '@codement/ui/images/logo.svg';
import People from '@codement/ui/images/welcome-people.svg';
import { getGQLError } from '@codement/ui/lib/apollo';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { LocalStorage } from '@codement/ui/lib/localStorage';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { Page } from '../../components/Page/Page';
import { routes } from '../../router/routes';


const StyledPage = styled(Page)`
  display: grid;
  padding-top: ${t.size('xbig')};
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

  & > svg:first-child { margin: auto; }

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


const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});


export const LoginPage = () => {
  const { login, loginError } = Auth.useContainer();

  const submit = (e: { email: string, password: string, rememberMe: boolean }) => {
    login(e.email, e.password, e.rememberMe);
  };

  return <StyledPage title="Login to Code Mentoring">
    <a href="https://codementoring.co"> <Logo /> </a>

    <Container>
      <Text variant="h1">Welcome back!</Text>
      <Text>Let&apos;s get coding <Emoji text="😊" /></Text>

      <Form
        onSubmit={submit}
        error={getGQLError(loginError)}
        validationSchema={loginValidation}
        initialValues={{
          email: LocalStorage.email || undefined
        }}
      >
        <FormField name="email" type="text" placeholder="Email" icon="user" />
        <FormField name="password" placeholder="Password" type="password" icon="password" />
        <FormField type="checkbox" name="rememberMe" text="Remember me?" />
        <Button size="large">Login</Button>
      </Form>

      <Text variant="small">
        New to Code Mentoring? <Link to={routes.signup()}>Join now</Link>
      </Text>
    </Container>

    <StyledPeople />
  </StyledPage>;
};
