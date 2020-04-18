import React from 'react';
import classnames from 'classnames';

export const FormStatus: React.FunctionComponent<{ error: boolean }> = ({
  error,
  children
}) =>
  <span className={classnames('form-status', { error })}>{children}</span>;
