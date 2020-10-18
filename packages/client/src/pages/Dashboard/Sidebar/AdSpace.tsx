import React from 'react';
import { theme as t, Text } from '@codement/ui';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 25rem;
  background: ${t.colors.grey[200]};
  border-radius: 4px;
  margin-top: ${t.size('xsm')};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdSpace: React.FC<{}> = () =>
  <Wrapper>
    <Text color="grey.800">Ad space if free user?</Text>
  </Wrapper>;
