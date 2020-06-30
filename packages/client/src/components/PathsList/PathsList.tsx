import { Path } from '@codement/api';
import { Icon, PathIcon, PathIconType, Text } from '@codement/ui';
import React, { useEffect, useState } from 'react';

import { Paths } from '../../containers/Paths.container';
import { IconWrapper, PathListWrapper, SelectablePath } from './PathsList.styles';

export type SelectedPath = Pick<Path, 'id'>;

interface PathsListProps {
  selectedPaths?: Path[];
  onChange?: (selectedPaths: Path[]) => void;
}

export const PathsList: React.FunctionComponent<PathsListProps> = ({
  selectedPaths: selected = [],
  onChange
}) => {

  const [selectedPaths, setSelectedPaths] = useState<Path[]>(selected);
  const { unjoinedData: paths, fetchUnjoined } = Paths.useContainer();

  useEffect(() => { fetchUnjoined(); }, []);

  useEffect(() => {
    if (onChange) onChange(selectedPaths);
  }, [selectedPaths]);

  const toggle = (p: Path) => {
    if (selectedPaths.includes(p)) return setSelectedPaths(selectedPaths.filter(_p => _p !== p));
    setSelectedPaths(cur => [...cur, p]);
  };


  return <PathListWrapper>
    {paths?.paths.map(p => {
      const isSelected = selectedPaths.includes(p);
      return <SelectablePath
        key={p.name}
        onClick={() => toggle(p)}
      >
        <IconWrapper selected={isSelected}>
          <PathIcon icon={p.icon as PathIconType} size="lg" />
          {isSelected && <Icon icon="check" size="lg" color="white" />}
        </IconWrapper>
        <Text>{p.name}</Text>
      </SelectablePath>;
    })}
  </PathListWrapper>;
};
