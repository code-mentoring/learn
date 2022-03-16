import React from 'react';
import styled from 'styled-components';
import { PathIcon, theme as t } from '@codement/ui';

const StyledLanguages = styled.div`
  position: absolute;
  bottom: ${t.size('xl')};
  left: 50%;
  transform: translateX(-50%);

  h3 {
    text-align: center;
    margin-bottom: ${t.size('sm')};
    font-size: ${t.size('sm')};
    color: ${t.colors.grey[700]};
    letter-spacing: ${t.size(0.75)};
  }
`;

const StyledPathIcon = styled(PathIcon)`
  &:not(:last-of-type) {
    margin-right: ${t.size('xbig')};
  }
`;

export default function Languages({ icons }) {
  return (
    <StyledLanguages>
      <h3>{icons.headline}</h3>
      <div>
        {icons.name.map(n => (
          <StyledPathIcon icon={n} key={n} size="huge" />
        ))}
      </div>
    </StyledLanguages>
  );
}
