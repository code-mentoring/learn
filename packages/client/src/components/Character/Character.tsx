import classnames from 'classnames';
import React, { PropsWithRef } from 'react';

import { characters } from './characters';

export type CharacterType = keyof typeof characters;

export interface CharacterProps extends PropsWithRef<any> {
  character: CharacterType;
}

export const Character: React.FunctionComponent<CharacterProps> = ({
  character,
  className,
  ...props
}) => {
  const klass = classnames('character', className);
  const CharacterComp = characters[character];
  if (!CharacterComp) return null;
  return <CharacterComp {...props} className={klass} />;
};
