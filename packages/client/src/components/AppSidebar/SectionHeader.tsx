import React from 'react';
import styled from 'styled-components';
import { Icon, IconType, theme as t, Text } from '@codement/ui';


export interface SectionHeaderProps {
  noBorder?: boolean;
  icon: IconType;
}

const StyledSectionHeader = styled.div<{noBorder?:boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => !p.noBorder && `border-bottom: ${t.borders.main}`};
  padding: ${t.size('sm')};
  
  p {
    padding: ${t.size('tiny')};
  }
`;

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  noBorder = false,
  icon,
  children
}) =>
  <StyledSectionHeader noBorder={noBorder}>
    <Icon icon={icon} color="grey.400" size="big" />
    <Text color="grey.400" fontWeight="bold" uppercase>{children}</Text>
  </StyledSectionHeader>;
