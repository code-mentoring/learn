import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import styles from './Modal.module.css';


export interface ModalProps extends React.HTMLProps<HTMLElement> {
  show?: boolean
  heading?: string | React.ComponentType;
  padding?: number;
  onClose?: () => void;
}

const Heading = styled.h2`
text-align: center;
`;

export const Modal: React.FC<ModalProps> = ({
  children,
  show: showInitial,
  heading,
  className,
  padding = 8,
  onClose
}) => {
  const [show, setShow] = useState(showInitial);
  useEffect(() => setShow(showInitial), [showInitial]);

  // Handle closing of modal
  useEffect(() => {
    if (onClose && !show) onClose();

    // Close the modal if the Escape key is pressed
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false);
    };

    // If mounting, configure the document to listen for Escape key
    if (show) document.addEventListener('keyup', handle);
    // Remove event listener when modal is closed
    return () => document.removeEventListener('keyup', handle);
  }, [show]);


  const Title = (typeof heading === 'string') ? <Heading>{heading}</Heading> : heading;


  const content = <aside className={styles.modalContainer}>
    <span onClick={() => setShow(false)} className="cursor-pointer" /> {/* Background */}
    <Card className={classnames('relative bg-white border-none', className)} padding={padding}>
      <header className="mb-6">
        {Title}
        <Icon
          className={`absolute right-0 top-0 mt-${padding} mr-${padding} cursor-pointer`}
          icon="x"
          color="grey.300"
          size="md"
          onClick={() => setShow(false)}
        />
      </header>
      <main>{children}</main>
    </Card>
  </aside>;


  return createPortal(
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enter: styles.transitionEnter,
        enterActive: styles.transitionEnterActive,
        exit: styles.transitionExit,
        exitActive: styles.transitionExitActive
      }}
      unmountOnExit
      mountOnEnter
      o
    >
      {content}
    </CSSTransition>,
    document.body
  );
};
