import React from 'react';

export const Hexagon: React.FunctionComponent<{className?: string}> = ({ className }) => (
  <svg className={`hexagon ${className}`} width="88" height="98" viewBox="0 0 88 98" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.7222 1.88675C41.8162 0.100423 45.6282 0.100423 48.7222 1.88675L82.0234 21.1132C85.1174 22.8996 87.0234 26.2008 87.0234 29.7735V68.2265C87.0234 71.7992 85.1174 75.1004 82.0234 76.8867L48.7222 96.1133C45.6282 97.8996 41.8162 97.8996 38.7222 96.1133L5.4209 76.8867C2.32689 75.1004 0.420898 71.7992 0.420898 68.2265V29.7735C0.420898 26.2008 2.32689 22.8996 5.4209 21.1132L38.7222 1.88675Z"
    />
  </svg>
);
