import React from 'react';

export const CenterWrapper: React.FunctionComponent = ({ children }) => <div className="absolute flex flex-col items-center z-10 max-w-lg center-element">
  {children}
</div>;
