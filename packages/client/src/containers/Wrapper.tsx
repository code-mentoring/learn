import React from 'react';
import { Auth } from './Auth.container';
import { Me } from './Me.container';


export const ContainerWrapper: React.FC = ({ children }) => (
  <Auth.Provider>
    <Me.Provider>
      {children}
    </Me.Provider>
  </Auth.Provider>
);
