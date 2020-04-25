import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Loader, Icon } from '@code-mentoring/ui';
import { User } from '@code-mentoring/api';
import { ErrorMessage } from '@code-mentoring/ui/components/ErrorMessage/ErrorMessage';
import LogoMark from '../../images/logo-mark.svg';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

// TODO: Replace user profile picture when #27 is completed.
// TODO: Replace the class icon with the actual class the student is
// TODO: Add conditionals for things that are supposed to appear depending on the page (ie. points, course)


const meQuery = gql`
  query {
    me {
      firstName
      lastName
      email
      id
    }
  }
`;

export const AppHeader: React.FC = () => {
  const { data, loading, error } = useQuery<{ me: User }>(meQuery);
  const [state, setState] = useState({
    click: false,
    menu: false,
    classes: false
  });

  if (loading) {
    return (
      <nav>
        <Loader />
      </nav>
    );
  }
  if (error) return <ErrorMessage error={error.message} />;

  const classesTypes = ['HTML5', 'JavaScript', 'React'];
  const menuItems = ['Profile', 'Settings', 'Help', 'Logout'];

  const toggleClick = (where: string, bool: boolean) => {
    if (where === 'menu') {
      setState({
        ...state,
        click: !state.click,
        menu: bool
      });
    } else {
      setState({
        ...state,
        click: !state.click,
        classes: bool
      });
    }
  };

  return (
    <nav className="border-b-2 border-solid border-grey-500 p-4">
      <LogoMark className="logo h-10 inline ml-20" />

      <div className="inline text-grey-700 font-bold text-sm uppercase">
        <Link to="/dashboard" className="mx-3">
          Dashboard
        </Link>
        <Link to="/friends">Friends</Link>
      </div>

      <div className="inline font-semibold float-right mr-16">
        <Icon
          icon="javascript"
          size="medium"
          style={{ color: '#EED81A' }}
          className="inline cursor-pointer"
          onClick={() => toggleClick('classes', !state.classes)}
        />
        {(state.click && state.classes) ? (
          <DropdownMenu title="My Classes" subjects={classesTypes} data={null} className="absolute bg-white flex flex-col" />
        ) : (
          null
        )}

        <div className="text-tertiary-500 inline ml-8 mr-8">
          <span className="text-lg">5</span>
          <Icon icon="fire" size="small" className="inline ml-1 mb-1" />
        </div>

        <button type="button" onClick={() => toggleClick('menu', !state.menu)}>
          <img
            className="rounded-circle inline-block cursor-pointer"
            src="http://placehold.it/30x30"
            alt="User profile pic"
          />
        </button>
        {(state.click && state.menu) ? (
          <DropdownMenu title="My Account" subjects={menuItems} data={data} className="absolute top-20 left-20 bg-white flex flex-col" />
        ) : (
          null
        )}
      </div>
    </nav>
  );
};
