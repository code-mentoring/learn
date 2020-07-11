import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import styled from 'styled-components';

import { Card } from '../Card/Card';
import { theme as t } from '../../css/theme';
import { Icon } from '../Icon/Icon';


export const ModalBackground = styled.span`
  background-color: #8F9FF0CC;
`;


export const ModalContent = styled(Card)`
  position: relative;
  padding: ${t.size('xbig')};
  padding-top: ${t.size()};
`;


export const CloseIcon = styled(Icon)`
  position: absolute;
  top: ${t.size('xbig')};
  right: ${t.size('lg')};
  cursor: pointer;

  &:hover { color: ${t.color('grey.600')}; }
`;

export const ModalHeader = styled.header`
  margin-bottom: ${t.size('lg')};
  text-align: center;
`;

export const ModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: -${t.size('sm')};
  margin-right: -${t.size('sm')};
  margin-top: ${t.size('xbig')};
`;


export const ModalWrapper = styled.aside`
  --transition-time: 0.3s;

  &, ${ModalBackground} {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${ModalBackground}, ${ModalContent} {
    transition: all var(--transition-time);
  }

  ${ModalContent} {
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;


export const StyledTransition: React.FC<CSSTransitionProps> = styled(CSSTransition)`
  &.transition-enter,
  &.transition-exit-active {
    ${ModalBackground} { opacity: 0; }
    ${ModalContent} { opacity: 0; transform: scale(0.5) }
  }

  &.transition-enter-active, &.transition-exit {
    ${ModalBackground} { opacity: 1; }
    ${ModalContent} { opacity: 1; transform: scale(1); }
  }

  &.transition-exit-active {
    ${ModalBackground} { opacity: 0; }
    ${ModalContent} {
      opacity: 0; transform: scale(0.5);
      transition-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
    }
  }
`;
