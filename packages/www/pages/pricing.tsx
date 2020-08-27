/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import { centerAbsolute, Button, Card, theme as t } from '@codement/ui';
import styled, { css } from 'styled-components';
import Layout from '../components/layout';
import { getPricing } from '../lib/pricing';

const buttonColor = [
  'secondary',
  'primary',
  'tertiary'
];

const cardColor = [
  t.colors.secondary[600],
  t.colors.primary[500],
  t.colors.tertiary[600]
];

const StyledHeroText = styled.div`
  grid-column: span 3;

  text-align: center;

  h2 {
    font-size: ${t.size('huge')};
    color: ${t.colors.primary[400]};
    font-family: ${t.fontFamily.code};
    line-height: ${t.size('giant')};
  }

  p {
    color: ${t.colors.grey[800]};
    margin: ${t.size('xsm')} 0;
  }
`;

const Price = styled.div`
  ${centerAbsolute};
  display: grid;
  justify-items: center;
  flex-basis: 100%;
  grid-template-columns: repeat(3, minmax(33rem, auto));
  grid-gap: ${t.size('huge')};
  padding: ${t.size('big')};
`;

const PriceCard = styled(Card)`${props => {
  const { color } = props;
  return css`
    text-align: center;
    border: 2px solid ${color};
    min-height: 40rem;

    font-family: ${t.fontFamily.code};
    
    h3 {
      font-size: ${t.size('lg')};
      color: ${color};
      line-height: ${t.size('xl')};
    }

    p {
      ${t.colors.grey[800]};
      margin: ${t.size('xsm')} 0;
    }

    #price {
      font-size: ${t.size('xbig')};
      color: ${color};
      line-height: ${t.size('xl')};
      font-weight: bold;
    }

    #limit {
      font-size: ${t.size('xbig')};
      color: ${t.colors.grey[500]};
      font-weight: bold;
    }`;
}}`;

const SignupButton = styled(Button)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 2rem;
  text-color: ${t.colors.white};
`;

export default function Pricing({ pricings }) {
  return (
    <Layout>
      <Price>
        <StyledHeroText>
          {
            pricings.headline.map(p =>
              <h2>
                {p}
              </h2>)
          }
          {
            pricings.description.map(d =>
              <p>
                {d}
              </p>)
          }
        </StyledHeroText>
        {
          pricings.pricing.map((p, i) => (
            <PriceCard color={cardColor[i]}>
              <h3>{p.level}</h3>
              <br />
              <p>{p.description}</p>
              <br />
              <p id="price">{p.price}</p>
              <p id="limit">{p.limit}</p>
              <SignupButton size="small" color={buttonColor[i]}>
                <Link href="/signup">
                  <span>SIGNUP</span>
                </Link>
              </SignupButton>
            </PriceCard>))
        }
      </Price>
    </Layout>
  );
}

export async function getStaticProps() {
  const pricings = getPricing();
  return {
    props: {
      pricings
    }
  };
}
