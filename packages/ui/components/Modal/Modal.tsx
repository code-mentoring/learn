import React from 'react';

interface ModalProps {
  setShow: any;
}

export const Modal: React.FC<ModalProps> = ({ children, setShow }) => (
  <aside
    className="absolute w-full h-full top-0 left-0 flex justify-center items-center"
    style={{ backgroundColor: 'rgba(143, 159, 240, 0.80)' }}
    onClick={() => setShow(false)}
    onKeyDown={() => setShow(false)}
    role="button"
    tabIndex={0}
  >
    {children}
  </aside>
);
