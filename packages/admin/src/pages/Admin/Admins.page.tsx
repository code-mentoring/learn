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
        <div className=" grid grid-cols-12 uppercase text-grey-500 text-xs font-extrabold tracking-wider pb-2 border-b border-grey-200">
          <div className="col-start-1 col-end-2">type</div>
          <div className="col-start-2 col-end-5">name</div>
          <div className="col-start-5 col-end-12">email</div>
          <div className="col-start-12 col-end-12 text-right">actions</div>
        </div>
        { adminList.map(admin =>
          <div className="grid grid-cols-12 text-grey-800 text-sm py-2 border-b border-grey-200">
            {/* TODO: icon to be determined by admin type */}
            <div className="col-start-1 col-end-2"><Icon icon="shieldAlt" size="small" color="pink-500" /></div>
            <div className="col-start-2 col-end-5"> { admin.firstName } { admin.lastName }</div>
            <div className="col-start-5 col-end-12">{ admin.email }</div>
            {/* TODO: action to be complete after design */}
            <div className="col-start-12 col-end-12 content-end"><Icon icon="user" size="small" color="secondary-500" /></div>
          </div>)}
      </PageContent>
    </Page>
  </>;
};
