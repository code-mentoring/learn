import React from 'react';
import { Character, CharacterProps } from './Character';

export const CharacterHTML = (props: Partial<CharacterProps>) => <Character
  body="tee1"
  head="cornrows2"
  face="calm"
  {...props}
/>;
