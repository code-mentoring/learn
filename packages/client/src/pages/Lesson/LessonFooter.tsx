import React from 'react';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';

export const StoryArticle = styled(({ children, ...props }) => <article {...props}>
  <div>{children}</div>
</article>)`
  background: ${t.color('primary.100')};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;

  & > div {
    max-height: calc(100% - 7.2rem * 2);
    padding: ${t.size('lg')} 0;
  }
`;

export const LessonFooter = styled.footer`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${t.size('huge')};
`;
