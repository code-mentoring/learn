import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { CardProps } from '../Card/Card';
import { Text } from '../Text/Text';
import { CloseIcon, ModalContent, ModalWrapper, StyledTransition, ModalBackground, ModalHeader, ModalFooter } from './Modal.styles';


export interface ModalProps extends React.HTMLProps<HTMLElement> {
  show?: boolean
  heading?: string | React.ComponentType;
  padding?: CardProps['padding'];
  onClose?: () => void;
  buttons?: React.ReactNode[]
}


export const Modal: React.FC<ModalProps> = ({
  children,
  show: showInitial,
  heading,
  className,
  padding = 'lg',
  onClose,
  buttons
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


  const Title = (typeof heading === 'string') ? <Text variant="h2" color="grey.800">{heading}</Text> : heading;


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
      {buttons?.length ? <ModalFooter>{buttons}</ModalFooter> : null}
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
