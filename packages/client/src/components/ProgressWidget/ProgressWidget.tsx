import { Card, CardProps, Icon } from '@code-mentoring/ui';
import React from 'react';

import { ProgressPath } from './ProgressPath';


// TODO: Fetch user paths to replace mocked paths

export interface ProgressWidgetProps extends CardProps { }

export const ProgressWidget: React.FC<ProgressWidgetProps> = props => {

  const paths = [
    {
      id: 1,
      name: 'JavaScript',
      icon: 'js',
      description: 'JavaScript Path',
      progress: 10
    },
    {
      id: 2,
      name: 'HTML5',
      icon: 'html',
      description: 'HTML5 Path',
      progress: 82
    }
  ];

  return (
    <Card {...props}>
      <h4 className="text-center mb-4">Progress</h4>
      <div className="grid grid-cols-3">
        {paths && paths.map(path => (
          <ProgressPath
            key={path.id}
            icon={path.icon}
            progress={path.progress}
          />
        ))}
        <div className="text-center">
          <div className="graphic cursor-pointer relative h-12 inline-block">
            <svg className="text-grey-300 w-12 h-12">
              <circle
                className="stroke-current"
                cx={24}
                cy={24}
                r={23}
                strokeWidth={2}
                strokeDasharray="4,7"
                fill="none"
              />
            </svg>
            <Icon
              icon="plus"
              size={8}
              className="absolute left-0 top-0 m-2 text-grey-200"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
