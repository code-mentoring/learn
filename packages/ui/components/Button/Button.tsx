import classnames from 'classnames';
import React, { HTMLProps } from 'react';

import { composeClass, WithColor, WithSize } from '../../lib/classes';

export type ButtonProps = HTMLProps<HTMLButtonElement> & WithColor & WithSize & {
  circle?: boolean;
  hollow?: boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  circle,
  type,
  className,
  hollow,
  ...props
}) => {
  const styles = composeClass(props, { color: 'bg', size: true }, className);

  return <button
    className={classnames(styles, { circle, hollow })}
    {...props}
  />;
};
