/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

interface ModalProps {
  setShow: any;
}

//CSS can be found @ ui/css/modal-join-path.css
export const Modal:React.FC<ModalProps> = ( {children} ) => {
  return (
    <aside className="modal-container">
      {children}
    </aside>
  );
};