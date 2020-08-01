import React from 'react';
import { Auth } from './Auth.container';
import { User } from './User.container';
import { Me } from './Me.container';


export const ContainerWrapper: React.FC = ({ children }) => (
  <Auth.Provider>
    <User.Provider>
      <Me.Provider>
        {children}
      </Me.Provider>
    </User.Provider>
  </Auth.Provider>
);
