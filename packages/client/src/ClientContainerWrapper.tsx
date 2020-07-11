import React from 'react';
import { Paths } from './containers/Paths.container';
import { Lesson } from './containers/Lesson.container';

export const ClientContainerWrapper: React.FC = ({ children }) => (
  <Paths.Provider>
    <Lesson.Provider>
      {children}
    </Lesson.Provider>
  </Paths.Provider>
);
