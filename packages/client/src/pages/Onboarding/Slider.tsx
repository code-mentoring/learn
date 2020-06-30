import React from 'react';
import { Emoji, theme, Text } from '@codement/ui';
import styled from 'styled-components';

interface SliderTextProps {
  value?: number;
}

const StyledEmoji = styled(Emoji)`
  display: block;
  font-size: ${theme.size('lg')};
  margin-bottom: ${theme.size('big')};
  user-select: none;
`;

export const SliderText: React.FunctionComponent<SliderTextProps> = ({ children,
  value = 0 }) => {
  const emojiArray = ['😅', '😳', '😶', '🙄', '😐', '😀', '😄', '😉', '😁', '😊', '😎'];
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
    <StyledEmoji text={emojiArray[value]} />
    {children}
    <Text color="grey.600">({textArray[value]})</Text>
  </>;
};
