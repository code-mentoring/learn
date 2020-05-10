/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface ModalProps {
  setShow: any;
}

export const Modal: React.FC<ModalProps> = ({ children, setShow }) => (
  <aside
    className="absolute w-full h-full top-0 left-0 flex justify-center items-center"
    style={{ backgroundColor: 'rgba(143, 159, 240, 0.80)' }}
    onClick={() => setShow(false)}
  >
    {children}
  </aside>
);
