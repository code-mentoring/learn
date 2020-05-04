import React from 'react';
import classnames from 'classnames';

interface IntroProps {
  className?: string;
  title: string;
  text: string;
}

export const Intro: React.FunctionComponent<IntroProps> = ({ className, title, text }) => (
  <div className={classnames('flex flex-col items-center', className)}>
    <h3 className="mb-3">{title}</h3>
    <p className="text-center mb-8">{text}</p>
  </div>
);
