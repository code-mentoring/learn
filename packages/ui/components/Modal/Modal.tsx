/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  setShow: any;
}

// CSS can be found @ ui/css/modal-join-path.css
export const Modal:React.FC<ModalProps> = ({ children }) => (
  <aside className={styles.modalContainer}>
    {children}
  </aside>
);
