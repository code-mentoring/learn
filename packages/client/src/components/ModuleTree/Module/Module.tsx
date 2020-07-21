import { Module as EModule } from '@codement/api';
import { Box, Icon, Text, theme as t } from '@codement/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { routes } from '../../../router/routes';
import Hex from './hex.svg';


export interface ModuleProps {
  module: EModule
}

interface Props {
  state: null | boolean; // Null = locked, false = incomplete, true = complete
}

const StyledModule = styled(Link)<Props>`
  display: block;
  position: relative;
  text-align: center;
  margin: auto;
  margin-bottom: ${t.size('xbig')};
  width: ${t.size('massive')};
  color: ${p => {
    switch (p.state) {
      default:
      case null: return t.color('grey');
      case false: return t.color('primary.400');
      case true: return t.color('green');
    }
  }};

  &, small {
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    color: ${p => {
    switch (p.state) {
      default:
      case false: return t.color('primary.300');
      case true: return t.color('green.400');
    }
  }};
    small { color: ${t.color('grey.600')}}
  }

  & > div {
    position: relative;
    width: ${t.size('massive')};
    height: ${t.size('massive')};
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Status = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${t.size('xbig')};
  height: ${t.size('xbig')};
  top: -0.5rem;
  right: 0.6rem;
  border-radius: 50%;
  background-color: ${t.color('green.700')};
  color: white;
  font-weight: ${t.fontWeight.bold};
`;

export const Module: React.FC<ModuleProps> = ({ module }) => {
  const href = (module.type === 'lesson')
    ? routes.lesson({ lessonId: module.id })
    : '';

  return <StyledModule state={module.completed} to={href}>
    <Box padding="none">
      <Hex />
      <StyledIcon icon="fire" size="lg" color="white" />
      {module.completed && <Status>
        <Icon icon="check" color="white" />
      </Status>}
    </Box>
    <Text variant="small" color="grey.700">{module.name}</Text>
  </StyledModule>;
};
