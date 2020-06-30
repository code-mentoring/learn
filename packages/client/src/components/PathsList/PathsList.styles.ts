import { centerAbsolute, PathIcon, theme as t, Icon } from '@codement/ui';
import styled from 'styled-components';

export const PathListWrapper = styled.div`
  display: grid;
  margin: ${t.size('lg')} 0;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${t.size()};
  justify-content: center;
  justify-items: center;
  user-select: none;
`;


export const SelectablePath = styled.div`
  width: ${t.size('massive')};
  position: relative;
  cursor: pointer;
  text-align: center;
`;

export const IconWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  width: ${t.size('massive')};
  height: ${t.size('massive')};
  border: ${t.borders.main};
  border-radius: ${t.borderRadius.default};
  margin-bottom: ${t.size('tiny')};
  transition: all 0.1s ease-out;

  ${p => p.selected && `
    background: ${t.color('green.200')};
    border-color: ${t.color('green')};
  `}

  ${PathIcon} { ${centerAbsolute} }

  ${Icon} {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background: ${t.color('green')};
    padding: 10%;
    border-radius: 50%;
  }
`;
