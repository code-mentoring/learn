import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loader, Icon } from '@codement/ui';
import { User } from '@codement/api';
import { Page, PageContent } from '../../components/Page/Page';

// TODO: To be replaced with admin query API
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

export const AdminsPage = () => {

  const { data, loading } = useQuery(getAdmins);

  if (loading) return <Loader />;
  const adminList: User[] = data?.users;

  return <>
    <Page title="Admin" className="bg-grey-100" styles={{ display: 'grid', gridTemplateColumns: '180px auto', gridTemplateRows: '80px auto' }}>
      <PageContent styles={{ position: 'relative', margin: '0 2rem 2rem' }}>
        <div
          className="uppercase text-grey-500 text-xs font-extrabold tracking-wider pb-2 border-b border-grey-200"
          style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 6fr 1fr' }}
        >
          <div>type</div>
          <div>name</div>
          <div>email</div>
          <div className="text-right">actions</div>
        </div>

        { adminList.map(admin =>
          <div
            className="text-grey-800 text-sm py-2 border-b border-grey-200"
            style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 6fr 1fr' }}
          >
            {/* TODO: icon to be determined by admin type */}
            <div><Icon icon="shieldAlt" size="small" color="pink-500" /></div>
            <div> { admin.firstName } { admin.lastName }</div>
            <div>{ admin.email }</div>
            {/* TODO: action to be complete after design */}
            <div className="content-end"><Icon icon="user" size="small" color="secondary-500" /></div>
          </div>) }
      </PageContent>
    </Page>
  </>;
};
