import { Button, Form, FormField, Emoji } from '@codement/ui';
import React from 'react';
import * as yup from 'yup';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { getGQLError } from '@codement/ui/lib/apollo';
import Logo from '@codement/ui/images/logo.svg';
import People from '@codement/ui/images/welcome-people.svg';
import { LocalStorage } from '@codement/ui/lib/localStorage';
import { Page } from '../../components/Page/Page';

const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export const LoginPage = () => {
  const { login, loginError } = Auth.useContainer();

  const submit = (e: { email: string, password: string, rememberMe: boolean }) => {
    login(e.email, e.password, e.rememberMe);
  };

  return <Page title="Login" type="login" header={false} className="bg-white text-center">
    <Logo className="logo h-12 inline m-6" />
    <div className="mt-24">
      <h1>Welcome back!</h1>

      <p className="body-2 mt-2 mb-4">Lets get coding <Emoji text="😊" /></p>
      <Form
        className="max-w-xs mx-auto"
        onSubmit={submit}
        error={getGQLError(loginError)}
        validationSchema={loginValidation}
        initialValues={{
          email: LocalStorage.email || undefined
        }}
      >
        <FormField className="mb-2" name="email" type="text" placeholder="Email" />
        <FormField name="password" placeholder="Password" type="password" />
        <FormField className="mb-2" type="checkbox" name="rememberMe" text="Remember me" />
        <Button btnType="secondary" size="large">Login</Button>
      </Form>
      <p className="body-2 mt-40 mb-4">New to Code Mentoring? <a href="https://codementoring.co/signup" className="text-primary-500">Join now</a></p>
    </div>
    <People className="fixed bottom-0 left-0 h-56" />
  </Page>;
};
