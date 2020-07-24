import { Card, CardProps, Icon, Text, theme as t } from '@codement/ui';
import React, { useState } from 'react';

import styled from 'styled-components';
import { Paths } from '../../../containers/Paths.container';
import { ModalJoinPath } from '../../../modals/JoinPath/JoinPath.modal';
import { PathProgress } from './PathProgress';

const Widget = styled(Card)`
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  margin-top: ${t.size('lg')};
`;

const JoinButton = styled.button`
  position: relative;
  cursor: pointer;

  &, svg:first-of-type {
    width: ${t.size('huge')};
    height: ${t.size('huge')};
  }

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    circle {
      stroke: ${t.color('grey')};
    }
  }
`;

export interface ProgressWidgetProps extends CardProps { }

export const ProgressWidget: React.FC<ProgressWidgetProps> = cardProps => {

  const { myPaths } = Paths.useContainer();
  const [showModal, setShowModal] = useState(false);

  return <Widget {...cardProps}>
    <Text as="h2" color="grey.600">Progress</Text>

    <Grid>

      {myPaths
        ? myPaths.map(p => <PathProgress path={p} key={p.id} />)
        : <Icon icon="emptyIcon" size="huge" color="grey.100" />}

      <JoinButton onClick={() => setShowModal(true)}>
        <svg>
          <circle
            cx={24}
            cy={24}
            r={23}
            strokeWidth={2}
            strokeDasharray="4,7"
            fill="none"
          />
        </svg>
        <Icon icon="plus" onClick={() => setShowModal(true)} color="grey" size="lg" />
      </JoinButton>
    </Grid>

    <ModalJoinPath
      show={showModal}
      onClose={() => setShowModal(false)}
    />
  </Widget>;
};
