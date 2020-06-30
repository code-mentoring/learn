import React from 'react';
import { Paths } from './containers/Paths.container';

export const ClientContainerWrapper: React.FC = ({ children }) => (
  <Paths.Provider>
    {children}
  </Paths.Provider>
);
