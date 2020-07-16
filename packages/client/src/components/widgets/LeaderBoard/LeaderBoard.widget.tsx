import { useQuery } from '@apollo/react-hooks';
import { User } from '@codement/api';
import { Loader, Text, PathIcon, PathIconType, theme as t, UserProfile } from '@codement/ui';
import { Card, CardProps } from '@codement/ui/components/Card/Card';
import { ErrorMessage } from '@codement/ui/components/ErrorMessage/ErrorMessage';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { Paths } from '../../../containers/Paths.container';

// TODO: Leaderboard query
const usersQuery = gql`query {
  users {
    firstName
    lastName
    profileImage
    id
  }
}`;

const Widget = styled(Card)`
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: ${t.size('xbig')};

    svg { margin-right: ${t.size()}}
  }
`;

const UserRow = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${t.size()};

  img {
    margin: 0 ${t.size()};
  }
`;

const EmptyIcon = styled.div`
  position: relative;
  width: ${t.size('lg')};
  height: ${t.size('lg')};
  margin-right: ${t.size('md')};
  border-radius: ${t.borderRadius.circle};
  background-color: ${t.colors.grey[200]};
`;

export const LeaderboardWidget: React.FC<CardProps> = props => {
  const { data, loading, error } = useQuery<{ users: User[] }>(usersQuery);
  const { currentPath } = Paths.useContainer();

  return <Widget {...props}>
    {loading
      ? <Loader />
      : <>
        <Text as="h2" color="grey.600">
          {currentPath
            ? <PathIcon icon={currentPath.icon as PathIconType} size="lg" />
            : <EmptyIcon />
           }
          Leaderboard
        </Text>
        {error
          ? <ErrorMessage error={error.message} />
          : <ul>{data?.users.map((u, i) => <UserRow key={u.id}>
            <Text color="grey">{i + 1}</Text>
            <UserProfile user={u} />
            <Text>{u.firstName} {u.lastName}</Text>
          </UserRow>)}
          </ul>
        }
      </>
    }
  </Widget>;
};
