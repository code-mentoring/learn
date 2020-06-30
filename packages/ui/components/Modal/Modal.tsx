import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { CardProps } from '../Card/Card';
import { Text } from '../Text/Text';
import { CloseIcon, ModalContent, ModalWrapper, StyledTransition, ModalBackground, ModalHeader } from './Modal.styles';


export interface ModalProps extends React.HTMLProps<HTMLElement> {
  show?: boolean
  heading?: string | React.ComponentType;
  padding?: CardProps['padding'];
  onClose?: () => void;
}


export const Modal: React.FC<ModalProps> = ({
  children,
  show: showInitial,
  heading,
  className,
  padding = 'lg',
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


  const Title = (typeof heading === 'string') ? <Text as="h2">{heading}</Text> : heading;


  const content = <ModalWrapper>
    <ModalBackground onClick={() => setShow(false)} />
    <ModalContent className={className} padding={padding}>
      <ModalHeader>
        {Title}
        <CloseIcon
          icon="x"
          color="grey.300"
          size="xbig"
          onClick={() => setShow(false)}
        />
      </ModalHeader>
      <main>{children}</main>
    </ModalContent>
  </ModalWrapper>;


  return createPortal(
    <StyledTransition
      in={show}
      timeout={300}
      classNames={{
        enter: 'transition-enter',
        enterActive: 'transition-enter-active',
        exit: 'transition-exit',
        exitActive: 'transition-exit-active'
      }}
      unmountOnExit
      mountOnEnter
    >
      {content}
    </StyledTransition>,
    document.body
  );
};
