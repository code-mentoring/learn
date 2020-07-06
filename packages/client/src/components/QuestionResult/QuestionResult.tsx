import React from 'react';

import { Text } from '@codement/ui/components/Text/Text';
import { QuestionResultDiv, IconBorder, StyledIcon, StyledTextDiv } from './QuestionResult.styles';

export interface QuestionResultProps extends React.HTMLAttributes<HTMLDivElement> {
    state: 'success' | 'error';
}

export const QuestionResult: React.FC<QuestionResultProps> = ({ state, children }) => {
  const icon = (state === 'success') ? <StyledIcon icon="check" size="lg" color="white" />
    : <StyledIcon icon="x" size="lg" color="white" />;

  return (
    <QuestionResultDiv>
      <IconBorder state={state}>
        {icon}
      </IconBorder>
      <StyledTextDiv>
        <Text as="body2">{children}</Text>
      </StyledTextDiv>
    </QuestionResultDiv>
  );
};
