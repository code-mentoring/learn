import React, { useMemo } from 'react';
import styled from 'styled-components';
import sample from 'lodash/sample';
import { Text, theme } from '@codement/ui';
import quotes from './quotes.json';

export const StyledQuote = styled.blockquote`
  font-size: ${theme.size('lg')};
  line-height: 2;
  color: ${theme.color('primary.400')};
  font-style: italic;
  max-width: 50rem;

  &:before, &:after {
    font-size: ${theme.size('huge')};
    opacity: 0.3;
    line-height: 1;
  }

  &:before {
    content: "“";
  }
  &:after {
    content: "”";
  }
`;

const Author = styled(Text)``;

export const QuoteLoader = () => {
  const [quote, author] = useMemo(() => {
    const q = sample(quotes);
    if (q instanceof Array) return q;
    return [q, null];
  }, []);

  return <>
    <StyledQuote>
      {quote}
    </StyledQuote>
    {author && <Author>{author}</Author>}
  </>;
};
