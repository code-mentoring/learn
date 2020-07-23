import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Text } from '@codement/ui/components/Text/Text';
import { Icon } from '@codement/ui/components/Icon/Icon';
import { Card, theme as t } from '@codement/ui';

export interface QuestionResultProps {
  state: 'success' | 'error';
}

const slideUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 75%, 0); }
  to { opacity: 1; transform: none; }
`;


const Wrapper = styled(Card)<QuestionResultProps>`
  animation: ${slideUp} 0.3s ease-out;
  display: flex;
  align-items: center;

  ${Icon} {
    border-radius: 50%;
    background: ${p => t.color((p.state! === 'success') ? 'secondary' : 'tertiary')};
    padding: ${t.size('xtiny')};
    margin-right: ${t.size()};
  }
`;

export const QuestionResult: React.FC<QuestionResultProps> = ({ state, children }) =>
  <Wrapper state={state} shadow={'error'}>
    <Icon icon={state === 'success' ? 'check' : 'x'} size="xl" color="white" />
    <Text variant="body2"> {children} </Text>
  </Wrapper>;
