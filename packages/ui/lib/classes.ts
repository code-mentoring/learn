export type Color =
  | 'error'
  | 'success'
  | 'transparent'
  | 'grey-100'
  | 'grey-200'
  | 'grey-300'
  | 'grey-400'
  | 'grey-500'
  | 'grey-600'
  | 'grey-700'
  | 'grey-800'
  | 'grey-900';

export type Size = 'small' | 'large';

export interface WithColor { color?: Color; }
export interface WithSize { size?: Size; }
