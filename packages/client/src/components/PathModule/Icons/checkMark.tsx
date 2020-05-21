import React from 'react';

export const CheckMark: React.FunctionComponent<{classname?: string}> = ({ classname }) => (
  <svg className={classname} width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 21.5C16.299 21.5 21 16.799 21 11C21 5.20101 16.299 0.5 10.5 0.5C4.70101 0.5 0 5.20101 0 11C0 16.799 4.70101 21.5 10.5 21.5Z"
    />
    <path
      d="M8.92778 15.7434L4.50586 11.3215L6.43267 9.39472L8.92778 11.8899L14.567 6.25061L16.4938 8.17742L8.92778 15.7434Z"
      fill="white"
    />
  </svg>
);
