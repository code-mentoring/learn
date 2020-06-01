import React from 'react';
import { Twemoji } from 'react-emoji-render';
import classnames from 'classnames';

import styles from './Emoji.module.css';

interface EmojiProps {
  className?: string;
  text?: string;
}

export const Emoji: React.FunctionComponent<EmojiProps> = ({ text }) =>
  <Twemoji className={classnames(styles.emoji)} svg text={text} />;
