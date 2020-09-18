import { Button, theme as t } from '@codement/ui';
import React from 'react';
import styled from 'styled-components';

export const TrainSection = styled.div`
  display: grid;
  grid-template-rows: min-content min-content 20rem;
  grid-gap: ${t.size('xsm')};
  padding: ${t.size('md')};
`;

const Note = styled.div`
  justify-self: center;
  text-align: center;
  width: 15rem;
  color: ${t.colors.grey[400]};
  font-size: ${t.size('xsm')};
`;

export const TrainConcepts: React.FC<{}> = () =>
  <TrainSection>
    <Button icon="weights" iconPosition="left" color="primary" border-radius={t.borderRadius.medium}>Train concepts</Button>
    <Note>Practice these concepts with a custom lesson.</Note>
  </TrainSection>;
