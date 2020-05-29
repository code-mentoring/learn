import React from 'react';
// import { useHistory } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loader, Icon } from '@codement/ui';
import { User } from '@codement/api';
import { Page } from '../../components/Page/Page';

// TODO: To be replaced with admin query API after
const getAdmins = gql`
  query users {
    users {
      id
      firstName
      lastName
      email
      createdAt
    }
  }`;

export const AdminPage = () => {
  const { data, loading } = useQuery(getAdmins);

  if (loading) return <Loader />;
  const adminList: User[] = data?.users;

  // const Action = [
  //   { label: 'Activate', icon: "check" },
  //   { label: 'Deactivate', icon: 'lock' },
  //   { label: 'Remove', icon: 'trash' }
  // ];

  if (loading) return <Loader />;

  return <>
    <Page title="Admin" className="bg-grey-200">
      <table className="table-fixed text-14px m-5 w-full text-left">
        <thead className="uppercase text-grey-500">
          <tr>
            <th className="w-1/12 py-2">type</th>
            <th className="w-3/12 py-2">name</th>
            <th className="w-7/12 py-2">email</th>
            <th className="w-1/12 py-2 text-right">actions</th>
          </tr>
        </thead>
        <tbody className="body-2">
          {
            adminList.map(admin =>
              <tr className="border-b border-grey-500" key={admin.email}>
                <th className="w-1/12 py-2">type</th>
                <th className="w-3/12 py-2"> { admin.firstName } { admin.lastName }</th>
                <th className="w-7/12 py-2">{ admin.email }</th>
                <th className="w-1/12 py-2 content-end"><Icon icon="check" size="small" /></th>
              </tr>)
          }
        </tbody>
      </table>
    </Page>
  </>;
};
