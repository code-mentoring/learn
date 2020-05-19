import React from 'react';
import { Twemoji } from 'react-emoji-render';
import classnames from 'classnames';

import './Twemoji.css';

interface EmojiProps {
    className?: string;
    text?: string;
}

export const Emoji: React.FunctionComponent<EmojiProps> = ({ className, text, ...props }) => (
  <div className={classnames('twemoji', className)} {...props}>
    <Twemoji svg text={text} />
  </div>
);
