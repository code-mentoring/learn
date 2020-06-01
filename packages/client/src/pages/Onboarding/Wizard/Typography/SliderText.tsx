import React from 'react';
import { Emoji } from '@codement/ui';

interface SliderTextProps {
  value?: number;
}

export const SliderText: React.FunctionComponent<SliderTextProps> = ({ children,
  value = 0 }) => {
  const emojiArray = [
    '😅',
    '😳',
    '😶',
    '🙄',
    '😐',
    '😀',
    '😄',
    '😉',
    '😁',
    '😊',
    '😎'
  ];
  const textArray = [
    'I’m just starting out.',
    'I know a little bit of coding.',
    'I’m learning some basic stuff.',
    'I understand the basics of code.',
    'I’m close to mastering the basics.',
    'I’ve mastered the basics of programming.',
    'I can build nice websites!',
    'I have a good understanding of some frameworks.',
    'I’ve developed some cool web applications!',
    'I’m confident in coding!',
    'I rock!'
  ];

  return <>
    <Emoji text={emojiArray[value]} className="mb-4 text-3xl" />
    {children}
    <span className="mt-4 text-grey-600">({textArray[value]})</span>
  </>;
};
