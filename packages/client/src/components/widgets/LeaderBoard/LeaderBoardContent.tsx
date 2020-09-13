
import { Loader, Text, theme as t, UserProfile } from '@codement/ui';
import { ErrorMessage } from '@codement/ui/components/ErrorMessage/ErrorMessage';
import React from 'react';
import styled from 'styled-components';
import { LeaderBoard } from './LeaderBoard.contianer';

const UserRow = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${t.size()};

  img {
    margin: 0 ${t.size()};
  }
`;

const Top3 = styled.div`
  text-align: center;
  border-bottom:${t.borders.main};
  display: grid;
  justify-items: center;
  align-content: center;

  grid-template-columns: repeat(3, ${t.size('huge')});
  grid-gap: ${t.size('none')} ${t.size('xl')};
  justify-content: space-evenly;
  padding: ${t.size('xsm')};

  sup {
    vertical-align: super;
    font-size: smaller;
  }
  
  p {
    color: ${t.colors.grey[500]};
    font-size: ${t.size('xsm')};
    font-weight: bold;
    line-height: ${t.size('sm')};
    padding: ${t.size('xsm')} ${t.size('none')}; 
  }
  
  div p {
    padding:${t.size('none')};
    position: absolute;
    bottom:0;
    left:50%;
    transform: translate(-50%, 0);
    text-align:center;
  }
  
  div {
    align-self: end;
    position: relative;
    border-radius: ${t.borderRadius.medium};
    width: 100%;
    padding: ${t.size('xsm')};
  }
  
  img {
    position: absolute;
    margin-top:${t.size('xtiny')};
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const No1 = styled.div`
  height: ${t.size('massive')};
  background: ${t.colors.secondary[200]};
  p {
    color: ${t.colors.secondary[600]};
  }
`;

const No2 = styled.div`
  height: ${t.size('giant')};
  background: ${t.colors.primary[200]};
  p {
    color: ${t.colors.primary[400]};
  }
`;

const No3 = styled.div`
  height: 5.9rem;
  background: ${t.colors.tertiary[200]};
  p {
    color: ${t.colors.tertiary[600]};
  }
`;

const RankingList = styled.div`
  margin-top: ${t.size('sm')};
  text-align: center;
  border-bottom:${t.borders.main};
`;

export const LeaderboardContent: React.FC = () => {
  const { data, loading, error } = LeaderBoard.useContainer();

  return <>
    {loading
      ? <Loader />
      : <>
        {error
          ? <ErrorMessage error={error.message} />
          : <>
            <Top3>
              <No2>
                <UserProfile user={data?.users[1]} />
                <br />
                <p>2<sup>nd</sup></p>
              </No2>
              <No1>
                <UserProfile user={data?.users[0]} />
                <p>1<sup>st</sup></p>
              </No1>
              <No3>
                <UserProfile user={data?.users[2]} />
                <p>3<sup>rd</sup></p>
              </No3>
              <p>
                {data?.users[1].firstName}
                <br />
                {data?.users[1].lastName}
              </p>
              <Text>
                {data?.users[0].firstName}
                <br />
                {data?.users[0].lastName}
              </Text>
              <Text>
                {data?.users[2].firstName}
                <br />
                {data?.users[2].lastName}
              </Text>
            </Top3>
            <RankingList>
              <ul>{data?.users.map((u, i) =>
                <UserRow key={u.id}>
                  <Text color="grey">{i + 1}</Text>
                  <UserProfile user={u} />
                  <Text>{u.firstName} {u.lastName}</Text>
                </UserRow>)}
              </ul>
            </RankingList>
          </>
        }
      </>
    }
  </>;
};
