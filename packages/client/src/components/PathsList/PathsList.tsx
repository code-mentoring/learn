import React, { useState, useEffect } from 'react';
import { Path } from '@codement/api';
import { PathIcon, Icon } from '@codement/ui';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames';

import styles from './PathsList.module.css';

export type SelectedPath = Pick<Path, 'id'>;

const getPaths = gql`{
  paths {
    id
    name
    icon
    description
  }
}`;

interface PathsListProps {
  selectedPaths?: Path[];
  onChange?: (selectedPaths: Path[]) => void;
}

export const PathsList: React.FunctionComponent<PathsListProps> = ({
  selectedPaths: selected = [],
  onChange
}) => {

  const [selectedPaths, setSelectedPaths] = useState<Path[]>(selected);
  const { data } = useQuery<{ paths: Path[] }>(getPaths);
  const path = data?.paths;

  useEffect(() => {
    if (onChange) onChange(selectedPaths);
  }, [selectedPaths]);

  const handleSelectPaths = (id: Path) => {
    if (selectedPaths.includes(id)) return setSelectedPaths(selectedPaths.filter(p => p !== id));
    setSelectedPaths([...selectedPaths, id]);
  };


  return <div className="flex overflow-auto justify-center whitespace-no-wrap container select-none">
    {path?.map(({ id, name, icon }) => {
      const isSelected = selectedPaths.includes(id as unknown as Path);
      return <div
        key={name}
        className="flex flex-col items-center relative mr-2 cursor-pointer"
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter') {
            handleSelectPaths(id as unknown as Path);
          }

        }}
        onClick={() => handleSelectPaths(id as unknown as Path)}
        role="button"
        tabIndex={0}
      >
        <div className={classnames('p-2 border-2 border-solid rounded w-20 h-20 relative', {
          'border-grey-200': !isSelected,
          'border-green-400': isSelected
        })}
        >
          <PathIcon className="absolute center-element" icon={icon as PathIcon} />
          {isSelected && <>
            <span className={classnames(`w-full h-full absolute top-0 left-0 ${styles.selectedLayer}`)} />
            <span className="absolute w-full h-full bg-green-400 opacity-25 top-0 left-0" />
            <Icon icon="check" size="small" color="white" className={`absolute ${styles.checkIcon}`} />
          </>}
        </div>
        <span className={styles.name}>{name}</span>
      </div>;
    })}
  </div>;
};
