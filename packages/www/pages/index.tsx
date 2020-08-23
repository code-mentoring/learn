/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { centerAbsolute, Button, theme as t } from '@codement/ui';
import styled from 'styled-components';
import People from '../public/people.svg';
import Logo from '../public/logo.svg';

const StyledHomePage = styled.div`
  background: linear-gradient(180deg, ${t.color('white')}, ${t.colors.primary[100]});
  height: 100vh;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${t.size('lg')} ${t.size('giant')};
`;

const StyledNavList = styled.ul`
  li {
    display: inline-block;

    :not(:last-of-type) {
      margin: 0 ${t.size('lg')} 0 0;
    }
  }
`;

const StyledAnchor = styled.a`
  color: ${t.colors.grey[700]};
  font-weight: ${t.fontWeight.heavy};
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: ${t.color('primary')};
  }
`;

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

const StyledPeople = styled(People)`
  position: fixed;
  left: -${t.size('tiny')};
  bottom: -${t.size('tiny')};
`;

export default function Home() {
  return (
    <StyledHomePage>
      <StyledNav>
        <Logo />
        <StyledNavList>
          <li>
            <Link href="/pricing">
              <StyledAnchor>Pricing</StyledAnchor>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <StyledAnchor>Signup</StyledAnchor>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <StyledAnchor>Login</StyledAnchor>
            </Link>
          </li>
        </StyledNavList>
      </StyledNav>
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
      <StyledPeople />
    </StyledHomePage>
  );
}
