import React from 'react';
import { Twemoji } from 'react-emoji-render';
import styled from 'styled-components';

interface EmojiProps {
  className?: string;
  text?: string;
}
export const Emoji = styled<React.FC<EmojiProps>>(
  ({ text, className }) => <Twemoji svg text={text} className={className} />
)`
  margin: 0;
  display: inline-block
  
`;
