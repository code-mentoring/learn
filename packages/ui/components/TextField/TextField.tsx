import classnames from 'classnames';
import React, { HTMLProps, MutableRefObject } from 'react';

import { Icon, IconType } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';


export interface TextFieldProps extends HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  icon?: IconType;
  iconSecondary?: IconType;
  iconColor?: string;
  iconSecondaryColor?: string;
  error?: string | Error;
  suffix?: string;
  forwardRef?: MutableRefObject<HTMLInputElement | null>;
  loading?: boolean;
  initialValue?: string;
  textarea?: boolean;
}

const Comp = ({ textarea, ...props }: any) => {
  if (textarea) return <textarea {...props} />;
  return <input {...props} />;
};


export const TextField: React.FunctionComponent<TextFieldProps> = ({
  icon,
  iconSecondary,
  iconColor = 'grey-30',
  iconSecondaryColor,
  className,
  error,
  disabled,
  suffix,
  loading,
  value,
  forwardRef,
  textarea,
  ...props
}) => {

  const [state, setState] = React.useState(0);
  const callback = React.useCallback((node: HTMLElement) => {
    if (node) return setState(node.getBoundingClientRect().width);
    setState(0);
  }, []);

  const err = error ? error.toString() : null;
  const icon2: IconType | undefined = err ? 'exclamation' : iconSecondary;
  const icon2Color = err ? 'error' : iconSecondaryColor;

  return <div className={classnames('input', className, {
    loading,
    suffix,
    disabled,
    error
  })}
  >
    {loading
      ? <Loader />
      : icon && <Icon icon={icon} color={iconColor} className="icon1" />}
    {icon2 && <Icon icon={icon2} color={icon2Color} className="icon2" />}
    <Comp
      className={classnames({
        'icon-left': Boolean(icon),
        'icon-right': Boolean(icon2)
      })}
      textarea={textarea}
      {...props}
      value={value}
      disabled={disabled}
      style={suffix && !error ? { paddingRight: `calc(1.5rem + ${state}px)` } : {}}
    />
    {suffix && !err && <span ref={callback}>{suffix}</span>}
  </div>;
};
