import React from 'react';
import styled from 'styled-components';

import svgBody from './body';
import svgFace from './face';
import svgHead from './head';
import { theme as t } from '../../css/theme';

export * from './Characters';

const StyledCharacter = styled.div`
  position: relative;
  width: 200px;

  svg {
    position: absolute;
    transform: translateX(-50%);
    overflow: visible;

    .ink {
      fill: ${t.color('primary.300')};
    }
    .background {
      fill: ${t.color('white')};
    }
  }

  :after {
    content: '';
    display: block;
    padding-bottom: 130%;
  }
`;

interface SvgProps {
  value: string;
  obj: any;
}

const Svg: React.FC<SvgProps> = ({ value, obj, ...props }) => {
  const S = obj[value];
  if (!S) throw new Error(`Could not find character part '${value}'`);
  return <S {...props} width="auto" height="260" />;
};

const StyledBody = styled(Svg)`
  width: 100%;
  bottom: 0;
  left: 50%;
`;

const StyledHead = styled(Svg)`
  width: 50%;
  left: 56%;
  bottom: 50%;
`;

const StyledFace = styled(Svg)`
  width: 34%;
  left: 61%;
  bottom: 48%;
`;

export interface CharacterProps {
  body: keyof typeof svgBody;
  head: keyof typeof svgHead;
  face?: keyof typeof svgFace;
}

export const Character: React.FC<CharacterProps> = ({
  body,
  head,
  face,
  ...props
}) => (
  <StyledCharacter {...props}>
    <StyledBody value={body} obj={svgBody} />
    <StyledHead value={head} obj={svgHead} />
    {face && <StyledFace value={face} obj={svgFace} />}
  </StyledCharacter>
);
