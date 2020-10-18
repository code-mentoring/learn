/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { theme as t } from '@codement/ui';
import styled from 'styled-components';
import People from '../public/people.svg';
import Logo from '../public/logo.svg';

const StyledHomePage = styled.div`
  background: linear-gradient(180deg, ${t.color('white')}, ${t.colors.primary[100]});
  height: 100vh;
  position: relative;
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

const StyledPeople = styled(People)`
  position: fixed;
  left: -${t.size('tiny')};
  bottom: -${t.size('tiny')};
`;

export default function Layout({ children, page, people = false }) {
  return (
    <StyledHomePage>
      <Head>
        <title>{page} - Code Mentoring</title>
      </Head>
      <StyledNav>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
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
      {children}
      {people && <StyledPeople />}
    </StyledHomePage>
  );
}
