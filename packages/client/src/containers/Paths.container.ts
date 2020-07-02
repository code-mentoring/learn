import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { Query, QueryPathArgs } from '@codement/api';
import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import myPathsQuery from '../gql/queries/myPaths.gql';
import pathQuery from '../gql/queries/pathWithModules.gql';
import unjoinedPathsQuery from '../gql/queries/unjoinedPaths.gql';


const LS_PATH = 'path';
const initialPath = localStorage.getItem(LS_PATH);

export const Paths = createContainer(() => {
  const [currentPathId, setCurrentPathId] = useState<string | null>(initialPath);
  const { data: myPaths, loading: loadingMyPaths } = useQuery<{ paths: Query['paths'] }>(myPathsQuery, {
    fetchPolicy: 'no-cache'
  });

  // Fetch BOTH the path AND it's modules
  const [fetchPathWithModules, { data: pathData, loading: loadingWithModules }] = useLazyQuery<{
    path: Query['path'],
    pathModules: Query['pathModules']
  }, QueryPathArgs>(pathQuery, {
    fetchPolicy: 'no-cache'
  });

  // Fetch BOTH the path AND it's modules
  const [fetchUnjoined, { data: unjoinedData }] = useLazyQuery<{
    paths: Query['paths']
  }>(unjoinedPathsQuery);

  // First run, load paths if no initial path
  useEffect(() => {
    if (!currentPathId && myPaths?.paths?.length) {
      setCurrentPathId(myPaths.paths[0].id);

    // Check if currentPathId is valid
    } else if (currentPathId && myPaths?.paths?.length) {
      if (!myPaths.paths.some(path => path.id === currentPathId)) {
        setCurrentPathId(myPaths.paths[0].id);
      }

    // If currentPathId is set but no myPaths, remove path from local storage
    } else if (currentPathId && !myPaths?.paths?.length) setCurrentPathId(null);
  }, [myPaths?.paths]);


  // Update local storage LS_PATH when the current path changes
  useEffect(() => {
    if (currentPathId) {
      localStorage.setItem(LS_PATH, currentPathId);
      fetchPathWithModules({
        variables: { id: currentPathId }
      });
    } else localStorage.removeItem(LS_PATH);
  }, [currentPathId]);

  return {
    currentPathId,
    setCurrentPathId,
    loading: loadingMyPaths || loadingWithModules,
    currentPath: pathData?.path,
    currentModules: pathData?.pathModules,
    myPaths: myPaths?.paths,
    fetchUnjoined,
    unjoinedData
  };
});
