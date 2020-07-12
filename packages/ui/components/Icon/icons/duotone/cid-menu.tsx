import React from 'react';

export const IconMenu: React.FC<{className?: string}> = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" id="export" viewBox="0 0 512 512">
  <rect width="448" height="448" x="32" y="32" fill="currentColor" opacity=".25" rx="24" />
  <rect width="280" height="48" x="116" y="131" className="current" />
  <rect width="280" height="48" x="116" y="232" className="current" />
  <rect width="280" height="48" x="116" y="333" className="current" />
</svg>;
