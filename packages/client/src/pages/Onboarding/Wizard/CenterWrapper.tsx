import React from 'react';

export const CenterWrapper: React.FunctionComponent = ({ children }) => <div className="absolute flex flex-col items-center z-10 max-w-xl center-element">
  {children}
</div>;
