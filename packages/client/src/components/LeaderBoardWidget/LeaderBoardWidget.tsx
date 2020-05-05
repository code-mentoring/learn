import React from 'react';
import { Card, CardProps } from '@codement/ui/components/Card/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '@codement/ui';
import { User } from '@codement/api';
import { ErrorMessage } from '@codement/ui/components/ErrorMessage/ErrorMessage';

// TODO: Replace user profile picture when #27 is completed

const usersQuery = gql`query {
  users {
    firstName
    lastName
    id
  }
}`;

export interface LeaderboardWidgetProps extends CardProps { }


export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = props => {
  const { data, loading, error } = useQuery<{ users: User[] }>(usersQuery);

  if (loading) return <Card><Loader /></Card>;

  return <Card padding={4} {...props}>
    <h4 className="text-center mb-4">Leaderboard</h4>
    {error
      ? <ErrorMessage error={error.message} />
      : data!.users.map(u => <div className="text-primary-500 font-semibold mb-2">
        <img className="rounded-circle inline-block mr-3" src="http://placehold.it/30x30" alt="User profile pic" />
        <span>{u.firstName} {u.lastName}</span>
      </div>)
    }
  </Card>;
};
