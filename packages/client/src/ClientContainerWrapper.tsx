import React from 'react';
import { Path } from './containers/Path.container';

export const ClientContainerWrapper: React.FC = ({ children }) => (
  <Path.Provider>
    {children}
  </Path.Provider>
);
