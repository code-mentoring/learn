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
  margin-top: ${t.size('xbig')};
  z-index: 1;
`;

const StyledPeople = styled(People)`
  position: fixed;
  bottom:0; left:0; height: 22rem;
  opacity: 0.2;

  @media (max-width: 600px) {
    bottom:0; left:0; height: 16rem;
  }
  @media (max-height: 600px) {
    display: none;
  }
`;


const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const ToggleField = styled.div`
  display:flex;
  justify-content: space-between;
  width: 90vw;
  max-width: 40rem;
`;


export const LoginPage = () => {
  const { login, loginError } = Auth.useContainer();
  const [passwordType, setPasswordType] = useState('password');

  const submit = (e: { email: string, password: string, rememberMe: boolean }) => {
    login(e.email, e.password, e.rememberMe);
  };
  const togglePasswordVisibility = (e: any) => {
    e.preventDefault();
    setPasswordType(type => (type === 'password' ? 'text' : 'password'));
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
          email: LocalStorage.email || '',
          password: ''
        }}
      >
        <FormField name="email" type="text" placeholder="Email" icon="user" />
        <FormField name="password" type={passwordType} placeholder="Password" icon="password" />
        <ToggleField>
          <FormField name="rememberMe" type="checkbox" text="Remember me?" />
          <div onClick={togglePasswordVisibility}>
            <FormField name="showPassword" type="checkbox" text="Show password" />
          </div>
        </ToggleField>
        <Button size="large">Login</Button>
      </Form>

      <Text variant="small">
        New to Code Mentoring? <Link to={routes.signup()}>Join now</Link>
      </Text>
    </Container>

    <StyledPeople />
  </StyledPage>;
};
