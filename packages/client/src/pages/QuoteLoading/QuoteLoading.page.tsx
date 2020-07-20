import React from 'react';
import { Loader, theme } from '@codement/ui';
import { fadeRight } from '@codement/ui/css/animations';
import styled from 'styled-components';
import { Page } from '../../components/Page/Page';
import { QuoteLoader } from '../../components/QuoteLoader/QuoteLLoader';

const StyledPage = styled(Page)`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;

  div, blockquote {
    margin: auto;
    margin-top: ${theme.size('lg')};
  }
  blockquote, p {
    animation: ${fadeRight} 0.5s ease-out forwards;
  }
  p {
    opacity: 0;
    animation-delay: 0.1s;
  }
`;

export const QuoteLoadingPage = () => <StyledPage title="Code Mentoring is loading...">
  <div>
    <QuoteLoader />
    <Loader size="massive" center={false} partyMode />
  </div>
</StyledPage>;
