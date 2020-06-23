import { Button, Card, Form, FormField } from '@codement/ui';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { getGQLError } from '@codement/ui//lib/apollo';
import Logo from '@codement/ui/images/logo.svg';
import React from 'react';
import * as yup from 'yup';

import { Page } from '../../components/Page/Page';


const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});


export const LoginPage = () => {
  const { login, loginError } = Auth.useContainer();
  const submit = (e: { email: string, password: string }) => {
    login(e.email, e.password);
  };

  return <Page title="Login" type="login" sideBar={false} header={false} className="grid items-center justify-center bg-blue-500 text-center">
    <Card className="center bg-white w-64" padding={4}>
      <Logo className="logo h-12 inline m-6" />
      <Form onSubmit={submit} error={getGQLError(loginError)} validationSchema={loginValidation}>
        <FormField name="email" type="text" placeholder="Email" icon="user" iconColor="grey-40" />
        <FormField name="password" placeholder="Password" type="password" icon="lock" iconColor="grey-40" />
        <Button btnType="secondary" size="large">Login</Button>
      </Form>
    </Card>
  </Page>;
};
