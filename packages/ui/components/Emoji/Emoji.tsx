import React from 'react';
import { Twemoji } from 'react-emoji-render';
import styled from 'styled-components';

interface EmojiProps {
  className?: string;
  text?: string;
}

const StyledTwemoji = styled(Twemoji)`
  img{
    margin: 0 !important;
    display: inline-block
  }
`;

export const Emoji: React.FC<EmojiProps> = p => <StyledTwemoji svg {...p} />;
