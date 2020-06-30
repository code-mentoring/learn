import { Button, theme as t } from '@codement/ui';
import styled from 'styled-components';

import { Page } from '../../components/Page/Page';


export const StyledPage = styled(Page)`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`;

export const Wrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Center = styled.div`
  max-width: 48rem;
  margin-top: -10rem;

  & > p {
    margin: ${t.size('lg')} 0;
  }
`;

export const Graphic = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 0;
`;

export const Step = styled.span<{ completed?: boolean, active?: boolean }>`
  display: block;
  width: ${t.size('big')};
  height: ${t.size('big')};
  border: ${t.borders.main};
  border-radius: 50%;
  margin-left: ${t.size('tiny')};

  ${p => p.completed && `
    border-color: ${t.color('green')};
    background: ${t.color('green')};
    cursor: pointer;
  `};

  ${p => p.active && `
    border-color: ${t.color('primary')};
  `};
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${t.size('xbig')};
  padding-right: ${t.size('xbig')};
`;

export const BackButton = styled(Button)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${t.color('grey')};
`;

export const NextButton = styled(Button)`
  margin-left: ${t.size()};
`;
