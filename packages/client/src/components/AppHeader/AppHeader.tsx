import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, PathIcon } from '@code-mentoring/ui';
import { ErrorMessage } from '@code-mentoring/ui/components/ErrorMessage/ErrorMessage';
import LogoMark from '../../images/logo-mark.svg';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { Me } from '../../containers/Me.container';

// ! Tried to use module.css but it's coming back as an empty object
// ! I read online that, because of TS, the easiest way to import is
// ! requiring.
// import styles from './AppHeader.module.css';
// let styles = require('./AppHeader.module.css');
import './AppHeader.css';

// TODO: Replace user profile picture when #27 is completed.
// TODO: Replace the class icon with the actual class the student is
// TODO: Fix points when the api is done (#26 ?)
// TODO: Add conditionals for things that are supposed to appear 
//          depending on the page(ie.points, course)

export const AppHeader: React.FC = () => {
  const { me, error } = Me.useContainer();
  const [menu, setMenu] = useState(false);
  const [path, setPath] = useState(false);
  const [hover, setHover] = useState(false);

  if (error) return <ErrorMessage error={error.message} />;

  const paths = ['HTML5', 'JavaScript', 'React'];
  const menuItems = ['Profile', 'Settings', 'Help', 'Logout'];

  const handleHover = (where: string, bool: boolean) => {
    if (where === 'menu') {
      setMenu(bool);
      setHover(bool)
    } else {
      setPath(bool);
      setHover(bool);
    }
  };

  return (
		<nav className="border-b-2 border-solid border-grey-500 p-4">
			<Link to="/dashboard">
				<LogoMark className="logo h-10 inline ml-20" />
			</Link>

			<div className="inline text-grey-700 font-bold text-sm uppercase">
				<Link to="/friends" className="mx-3">
					Friends
				</Link>
			</div>

			<div className="inline font-semibold float-right mr-16">
				<PathIcon
          icon="js"
          size="medium"
          className="inline cursor-pointer"
					onMouseEnter={() => handleHover("paths", true)}
					onMouseLeave={() => handleHover("paths", false)}
				/>
				{path && hover && (
					<DropdownMenu
						title="My Paths"
						subjects={paths}
						data={null}
						className={`absolute bg-white flex flex-col paths`}
						onMouseEnter={() => handleHover("paths", true)}
						onMouseLeave={() => handleHover("paths", false)}
					/>
				)}

				<div className="text-tertiary-500 inline ml-8 mr-8">
					<span className="text-lg">5</span>
					<Icon icon="fire" size="small" className="inline ml-1 mb-1" />
				</div>

				<button
					type="button"
					onMouseEnter={() => handleHover("menu", true)}
					onMouseLeave={() => handleHover("menu", false)}
				>
					<img
						className="rounded-circle inline-block cursor-pointer"
						src="http://placehold.it/30x30"
						alt="User profile pic"
					/>
				</button>
				{menu && hover && (
					<DropdownMenu
						title="My Account"
						subjects={menuItems}
						data={me}
						className={`absolute top-20 left-20 bg-white flex flex-col menu`}
						onMouseEnter={() => handleHover("menu", true)}
						onMouseLeave={() => handleHover("menu", false)}
					/>
				)}
			</div>
		</nav>
	);
};

