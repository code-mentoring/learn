import React from 'react';
import { Card, CardProps } from '@codement/ui/components/Card/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '@codement/ui';
import { User } from '@codement/api';
import { ErrorMessage } from '@codement/ui/components/ErrorMessage/ErrorMessage';

const usersQuery = gql`query {
  users {
    firstName
    lastName
    profileImage
    id
  }
}`;

export interface LeaderboardWidgetProps extends CardProps { }


export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = props => {
  const { data, loading, error } = useQuery<{ users: User[] }>(usersQuery);

  if (loading) return <Card><Loader /></Card>;

  return <Card {...props}>
    <h4 className="text-center mb-4">Leaderboard</h4>
    {error
      ? <ErrorMessage error={error.message} />
      : data!.users.map(u => <div className="text-primary-500 font-semibold mb-2">
        <img
          className="rounded-circle inline-block mr-3"
          src={u.profileImage}
          height="30px"
          width="30px"
          alt="User profile pic"
        />
        <span>{u.firstName} {u.lastName}</span>
      </div>)
    }
  </Card>;
};
