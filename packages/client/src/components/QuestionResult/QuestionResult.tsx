import React from 'react';

import { Text } from '@codement/ui/components/Text/Text';
import { Icon } from '@codement/ui/components/Icon/Icon';
import { QuestionResultDiv, IconBorder } from './QuestionResult.styles';

export interface QuestionResultProps extends React.HTMLAttributes<HTMLDivElement> {
    state: 'success' | 'error'
}

export const QuestionResult: React.FC<QuestionResultProps> = ({ state, children }) => (
  <QuestionResultDiv>
    <IconBorder state={state}>
      <Icon icon={state === 'success' ? 'check' : 'x'} size="lg" color="white" />
    </IconBorder>
    <Text as="body2">
      {children}
    </Text>
  </QuestionResultDiv>
);
