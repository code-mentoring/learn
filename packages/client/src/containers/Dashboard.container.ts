import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { User } from '@codement/api';
import { useState } from 'react';
import { createContainer } from 'unstated-next';

// TODO: Leaderboard query
const usersQuery = gql`query {
    users {
      firstName
      lastName
      profileImage
      id
      streak
    }
}`;

export const DashBoard = createContainer(() => {
  const [currentSelector, setCurrentSelector] = useState('day');
  const { data, loading, error } = useQuery<{ users: User[] }>(usersQuery);

  return {
    currentSelector,
    setCurrentSelector,
    data,
    loading,
    error
  };
});
