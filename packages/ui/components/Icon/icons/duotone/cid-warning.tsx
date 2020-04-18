import React from 'react';

export const IconWarning: React.FC<{className?: string}> = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" id="export" viewBox="0 0 512 512">
  <polygon fill="currentColor" points="272 32 240 32 16 440 16 480 496 480 496 440 272 32" opacity=".25"/>
  <rect width="40" height="40" x="236" y="376" className="current"/>
  <polygon points="274 336 288 264 288 184 224 184 224 264 238 336 274 336" className="current"/>
</svg>;
