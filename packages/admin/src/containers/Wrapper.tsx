import React from 'react';
import { Auth } from '@codement/ui/lib/containers/Auth.container';
import { Me } from '@codement/ui/lib/containers/Me.container';


export const ContainerWrapper: React.FC = ({ children }) => (
  <Auth.Provider>
    <Me.Provider>
      {children}
    </Me.Provider>
  </Auth.Provider>
);
