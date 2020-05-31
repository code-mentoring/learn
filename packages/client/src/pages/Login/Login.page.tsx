import { Button, Form, FormField, Checkbox } from '@codement/ui';
import React from 'react';
import * as yup from 'yup';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { getGQLError } from '@codement/ui/lib/apollo';
import Logo from '@codement/ui/images/logo.svg';
import People from '@codement/ui/images/welcome-people.svg';
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

  return <Page title="Login" type="login" header={false} className="bg-white text-center">
    <Logo className="logo h-12 inline m-6" />
    <div className="mt-24">
      <h1>Welcome back!</h1>
      <p className="body-2 mt-2 mb-4">Lets get coding <span role="img" aria-label="smile-emoji">😊</span></p>
      <Form className="max-w-xs mx-auto" onSubmit={submit} error={getGQLError(loginError)} validationSchema={loginValidation}>
        <FormField className="mb-2" name="email" type="text" placeholder="Email" />
        <FormField className="mb-4" name="password" placeholder="Password" type="password" icon="passwordEye"/>
        <div className="flex justify-between">
          <div className="flex">
            <Checkbox className="h-4 w-4" />
            <p className="body-3">Remember Me</p>
          </div>
          <p className="body-3 underline cursor-pointer">Forgot Password?</p>
        </div>
        <Button color="success">Login</Button>
      </Form>
      <p className="body-2 mt-40 mb-4">New to Code Mentoring? <a href="https://codementoring.co/signup" className="font-extrabold text-primary-500">Join now</a></p>
    </div>
    <People className="fixed bottom-0 left-0 h-56" />
  </Page>;
};
