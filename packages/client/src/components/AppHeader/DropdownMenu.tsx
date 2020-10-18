import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { theme as t } from '@codement/ui';
import { Link } from 'react-router-dom';

export interface Menu {
    title: string;
    link: string;
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  menu: Menu[];
}

interface DropdownBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    menu: Menu[];
    setShowDropdown: (boolean)=>void;
}

const StyledDropdownBody = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  text-align: center;

  padding: 0 10px;
  background-color: white;
  border: ${t.borders.main};
  border-top: 0;
  border-bottom-right-radius: ${t.size('tiny')};
  border-bottom-left-radius: ${t.size('tiny')};
  div {
      padding: ${t.size('sm')};
      border-top: ${t.borders.main};

      a {
        font-size: ${t.size('xsm')};
        font-weight: ${t.fontWeight.bold};
        color: ${t.colors.grey[400]};
      }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownHeader = styled.div<{showDropdown: boolean}>`
  text-align: center;
  justify-items: center;
  align-content: center;
  align-items: center;

  width:14rem;
  height: ${t.size('huge')};
  padding: ${t.size('tiny')};
  
  display: grid;
  grid-template-columns: min-content auto min-content;
  grid-template-rows: auto;
  
  border: ${t.borders.main};
  ${p => p.showDropdown && `border-bottom-color: ${t.colors.transparent}`};
  box-sizing: border-box;
  border-radius: ${t.size('tiny')};
  ${p => p.showDropdown && 'border-bottom-left-radius: 0'};
  ${p => p.showDropdown && 'border-bottom-right-radius: 0'};

  small {
    align-self: center;
    padding: ${t.size('tiny')};
    font-weight: bold;
  }
`;

const DropdownBody: React.FC<DropdownBodyProps> = ({
  menu,
  setShowDropdown
}) =>
  <StyledDropdownBody>
    {menu.map(item => (
      <div key={item.title}>
        <Link to={item.link} onClick={() => setShowDropdown(false)}>
          {item.title.toUpperCase()}
        </Link>
      </div>
    ))}
  </StyledDropdownBody>;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ menu, children }) => {
  const [showUserDropdownMenu, setShowUserDropdownMenu] = useState(false);
  const toggleDropdown = () => setShowUserDropdownMenu(!showUserDropdownMenu);
  const dropdown = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setShowUserDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return <DropdownContainer ref={dropdown}>
    <DropdownHeader showDropdown={showUserDropdownMenu} onClick={() => toggleDropdown()}>
      {children}
    </DropdownHeader>
    {showUserDropdownMenu
      && <DropdownBody
        menu={menu}
        setShowDropdown={setShowUserDropdownMenu}
      />}
  </DropdownContainer>;
};
