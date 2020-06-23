import { Card, CardProps, Icon } from '@codement/ui';
import React, { useState } from 'react';

import { Path } from '../../containers/Path.container';
import { ModalJoinPath } from '../../modals/JoinPath/JoinPath.modal';
import { ProgressPath } from './ProgressPath';


export interface ProgressWidgetProps extends CardProps { }

export const ProgressWidget: React.FC<ProgressWidgetProps> = cardProps => {

  const { myPaths } = Path.useContainer();
  const [showModal, setShowModal] = useState(false);

  return <Card {...cardProps}>
    <h4 className="text-center mb-4">Progress</h4>
    <div className="grid grid-cols-3">
      {myPaths?.map(path =>
        <ProgressPath
          key={path.pathId}
          icon={path.path.icon}
          progress={path.progress}
        />
      )}
      <div
        className="text-center"
        onClick={() => setShowModal(true)}
      >
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
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
    </div>

    <ModalJoinPath
      show={showModal}
      onClose={() => setShowModal(false)}
    />
  </Card>;
};
