// TODO: Concept icon

import { Text, TextProps, theme as t } from '@codement/ui';
import React from 'react';
import styled from 'styled-components';

export interface ConceptTextProps extends TextProps {
  name: string;
}

const StyledText: React.FC<TextProps> = styled(Text)`
  white-space: nowrap;
  background: ${t.color('secondary.200')};
  color: ${t.color('secondary.700')};
  padding: ${t.size('xtiny')} ${t.size('tiny')};
  border-radius: ${t.size()};
  font-size: ${t.size('big')};
`;

export const ConceptText: React.FC<ConceptTextProps> = ({ ...props }) =>
  <StyledText {...props} variant="span" />;
