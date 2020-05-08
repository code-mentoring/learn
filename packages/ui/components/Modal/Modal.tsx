import React from 'react';

interface ModalProps { }

export const Modal: React.FC<ModalProps> = ({children}) => {
  return (
    <aside className="flex w-full h-full">
      {children}
    </aside>
  );
}