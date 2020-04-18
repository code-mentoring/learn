import classnames from 'classnames';

export type Color =
  'main' |
  'main-soft' |
  'main-dark' |
  'main-darkest' |
  'text' |
  'paper' |
  'error' |
  'success' |
  'grey-10' |
  'grey-20' |
  'grey-30' |
  'grey-40' |
  'grey-50' |
  'grey-60' |
  'grey-70' |
  'grey-80' |
  'grey-90' |
  'grey-100';

export type Size =
  'huge' |
  'large' |
  'main' |
  'medium' |
  'small';

export interface WithColor { color?: Color; }
export interface WithSize { size?: Size; }

export type ComposeClassOptions = {
  color?: boolean | string;
  size?: boolean | string;
};


export const composeClass = (props: any, options: ComposeClassOptions, className?: string) => {
  const classes: { [className: string]: boolean } = {};

  Object.keys(options).map(k => {
    const key = k as keyof ComposeClassOptions;
    const map = options[key] === true ? k : options[key];
    if (options[k as keyof ComposeClassOptions]) classes[`${map}-${props[k]}`] = Boolean(props[k]);
  });

  return classnames(className, classes);
};
