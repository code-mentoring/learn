import React, { HTMLProps, MutableRefObject } from 'react';

import { Color } from '../../types/styled';
import { Icon, IconType } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';
import { BaseFieldProps, StyledInput, StyledTextarea } from './TextField.styles';


export interface TextFieldProps extends Omit<HTMLProps<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  icon?: IconType;
  iconSecondary?: IconType;
  iconColor?: Color;
  iconSecondaryColor?: Color;
  error?: string | Error;
  suffix?: string;
  forwardRef?: MutableRefObject<HTMLInputElement | null>;
  loading?: boolean;
  initialValue?: string;
  textarea?: boolean;
  size?: 'main' | 'small'
}

type CompProps = BaseFieldProps & TextFieldProps;
const Comp: React.FC<CompProps> = ({ textarea, ...props }: any) => {
  if (textarea) return <StyledTextarea {...props} />;
  return <StyledInput {...props} />;
};


export const BaseTextField: React.FunctionComponent<TextFieldProps> = ({
  icon,
  iconSecondary,
  iconColor = 'grey.300',
  iconSecondaryColor,
  className,
  error,
  disabled,
  suffix,
  loading,
  value,
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

  const states = { loading, suffix, disabled, error };

  return <div {...states} className={className}>
    {loading
      ? <Loader />
      : icon && <Icon icon={icon} color={iconColor} />}
    {icon2 && <Icon icon={icon2} color={icon2Color} data-second="true" />}

    <Comp
      iconLeft={Boolean(icon)}
      iconRight={Boolean(icon2)}
      {...props}
      value={value}
      disabled={disabled}
      style={suffix && !error ? { paddingRight: `calc(1.5rem + ${state}px)` } : {}}
    />

    {suffix && !err && <span ref={callback}>{suffix}</span>}

  </div>;
};
