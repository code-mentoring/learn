import React from 'react';

export const WizardIconsWrapper: React.FunctionComponent = ({ children }) => <div className="w-screen absolute bottom-0 left-0 z-0">
  <div className="flex justify-between items-baseline">
    {children}
  </div>
</div>;
