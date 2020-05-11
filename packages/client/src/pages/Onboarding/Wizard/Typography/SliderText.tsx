import React from 'react';
import { Twemoji } from 'react-emoji-render';

interface SliderTextProps {
    value?: number;
}

export const SliderText: React.FunctionComponent<SliderTextProps> = ({ children, value = 0 }) => {
  const emojiArray = ['😅', '😳', '😶', '🙄', '😐', '😀', '😄', '😉', '😁', '😊', '😎'];
  const textArray = ['I’m just starting out.', 'I know a little bit of coding.',
    'I’m learning some basic stuff.', 'I’m understanding the basics of code.', 'I’m getting closer to mastering the basics.', 'I’m confident in basics of programming.', 'I can build nice websites!', 'I have a better understanding of famous frameworks.', 'I’ve developed some cool web applications!', 'I’m confident in coding!', 'I’m the best developer!'];

  return <>
    <Twemoji svg text={emojiArray[value]} onlyEmojiClassName="mb-4 text-3xl mr-1" />
    {children}
    <span className="mt-4 text-grey-600">({textArray[value]})</span>
  </>;
};
