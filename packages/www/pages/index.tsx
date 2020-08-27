/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { centerAbsolute, Button, theme as t } from '@codement/ui';
import styled from 'styled-components';
import Layout from '../components/layout';

const StyledHeroText = styled.div`
  width: 600px;
  ${centerAbsolute};
  text-align: center;

  h2 {
    font-size: ${t.size('huge')};
    color: ${t.colors.primary[400]};
    font-family: ${t.fontFamily.code};
    line-height: ${t.size('massive')};
  }

  p {
    color: ${t.colors.grey[800]};
    margin: ${t.size('xsm')} 0;
  }
`;


export default function Home() {
  return (
    <Layout people>
      <StyledHeroText>
        <h2>
          Coding got you lost? We&apos;re here to help!
        </h2>
        <p>
          We get it. Coding is hard, epecially when you’re starting out. That’s why we created Code Mentoring. A platform that grows with you.
        </p>
        <Button size="large" color="secondary">
          Learn coding for free
        </Button>
      </StyledHeroText>
    </Layout>
  );
}
