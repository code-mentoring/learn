import { Card, theme as t, theme } from '@codement/ui';
import Prism from 'prismjs';
import React, { useEffect, useMemo, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(${t.size()});
    opacity: 0;
  };
  to {
    transform: none;
    opacity: 1;
  };
`;

const Wrapper = styled.div`
  position: relative;
  animation: ${slideUp} ease-out 0.5s;

  &:before, &:after {
    content: '▲';
    display: block;
    font-size: 6rem;
    position: absolute;
    left: 0;
    top: 100%;
    transform: rotate(-140deg) translate(3.8rem,0.3rem);
    color: ${t.color('white')};
  }
  &:before {
    text-shadow: 0 4px 13px #211F2928;
  }
`;

const StyledCard = styled(Card)`
  width: 60rem;
  position: relative;
  line-height: 1.75;
  font-size: ${t.size('big')};
  color: ${t.color('grey.800')};

  strong {
    color: ${theme.color()};
    font-weight: ${theme.fontWeight.bold};
  }

  h1, h2, h3 {
    text-align: center;
    margin-top: -10rem;
    margin-bottom: ${t.size('huge')};
    font-weight: ${t.fontWeight.bold};
    color: ${t.color('grey.700')};
  }

  h1 { font-size: ${t.size('lg')} };
  h2 { font-size: ${t.size('xbig')} };

  em { font-style: italic; }

  p + *, pre[class*="language-"] {
    margin-top: ${t.size('xbig')};
  }

  code {
    background: #1e1e3f;
    border-radius: ${t.borderRadius.medium};
    padding: 0 ${t.size('xtiny')};
    color: #9efeff;
    margin: 0 ${t.size('xtiny')};
  }
  /* pre + p { margin-top: ${t.size('xl')}; } */

  blockquote {
    &:before {
      content: 'Pro tip:';
      text-transform: uppercase;
      color: ${t.color()};
      font-weight: ${t.fontWeight.bold};
      font-size: ${t.size('sm')};
    }
    border-left: 4px solid ${t.color()};
    background: ${t.color('primary.200')};
    border-radius: ${t.borderRadius.default};
    font-size: ${t.size()};
    padding: ${t.size('sm')} ${t.size()};

    p:first-child { display: block; }
  }
`;


export const Quote: React.FC = ({ children, ...props }) => {
  const wrapper = useRef<any>();

  useEffect(() => {
    if (wrapper.current) Prism.highlightAllUnder(wrapper.current);
  }, [wrapper.current]);

  return useMemo(() => <Wrapper ref={wrapper} {...props}>
    <StyledCard padding="huge">{children}</StyledCard>
  </Wrapper>, [children]);
};
