import React, { HTMLProps, MutableRefObject } from 'react';

import { Color } from '../../types/styled';
import { Icon, IconType } from '../Icon/Icon';
import { Loader } from '../Loader/Loader';
import { BaseFieldProps, StyledInput, StyledTextarea, StyledTextField } from './TextField.styles';

export interface TextFieldProps extends HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
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
}

type CompProps = BaseFieldProps & TextFieldProps;
const Comp: React.FC<CompProps> = ({ textarea, ...props }: any) => {
  if (textarea) return <StyledTextarea {...props} />;
  return <StyledInput {...props} />;
};


export const TextField: React.FunctionComponent<TextFieldProps> = ({
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

  const hasIcon = (icon && icon2) ? 'both'
    : icon ? 'left' : icon2 ? 'right' : undefined;


  return <StyledTextField {...states} className={className}>
    {loading
      ? <Loader />
      : icon && <Icon icon={icon} color={iconColor} />}
    {icon2 && <Icon icon={icon2} color={icon2Color} data-second="true" />}

    <Comp
      hasIcon={hasIcon}
      textarea={textarea}
      {...props}
      value={value}
      disabled={disabled}
      style={suffix && !error ? { paddingRight: `calc(1.5rem + ${state}px)` } : {}}
    />

    {suffix && !err && <span ref={callback}>{suffix}</span>}

  </StyledTextField>;
};
