import { Button, Card, Form, FormField } from '@code-mentoring/ui';
import React from 'react';
import * as yup from 'yup';

import { Page } from '../../components/Page/Page';
import { Auth } from '../../containers/Auth.container';
import Logo from '../../images/logo.svg';
import { getGQLError } from '../../lib/apollo';


const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});


export const LoginPage = () => {
  const { login, loginError } = Auth.useContainer();
  const submit = (e: { email: string, password: string }) => {
    login(e.email, e.password);
  };

  return <Page title="Login" type="login" className="grid items-center justify-center bg-blue-500 text-center">
    <Card className="center bg-white w-64" padding={4}>
      <Logo className="logo h-12 inline m-6" />
      <Form onSubmit={submit} error={getGQLError(loginError)} validationSchema={loginValidation}>
        <FormField name="email" type="text" placeholder="Email" icon="user" iconColor="grey-40" />
        <FormField name="password" placeholder="Password" type="password" icon="lock" iconColor="grey-40" />
        <Button>Login</Button>
      </Form>
    </Card>
  </Page>;
};
