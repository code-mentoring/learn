import React from 'react';
import { Auth } from './Auth.container';
import { Me } from './Me.container';


export const ContainerWrapper: React.FunctionComponent = ({ children }) =>
  <Auth.Provider>
  <Me.Provider>
    {children}
  </Me.Provider>;
  </Auth.Provider>;
