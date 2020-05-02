import React from 'react';
import { Card, CardProps, Icon } from '@code-mentoring/ui';
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
      <div className="flex justify-between">
        {paths && paths.map(path => (
          <ProgressPath
            key={path.id}
            icon={path.icon}
            progress={path.progress}
          />
        ))}
        <div className="inline-block mx-1">
          <svg width="48" height="48" className="cursor-pointer">
            <g>
              <circle
                stroke="#EAE7F6"
                cx={24}
                cy={24}
                r={23}
                strokeWidth={4}
                strokeDasharray="10,10"
                fill="none"
              />
            </g>
            <Icon
              icon="plus"
              size="small"
              className="text-grey-200"
            />
          </svg>
          <span className="invisible">Add Path</span>
        </div>
      </div>
    </Card>
  );
};
