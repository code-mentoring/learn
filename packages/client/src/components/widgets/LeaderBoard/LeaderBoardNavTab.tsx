import React from 'react';
import styled from 'styled-components';
import { theme as t } from '@codement/ui';
import { DashBoard } from '../../../containers/Dashboard.container';

const NavTab = styled.div`
  border-bottom:${t.borders.main};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: -1;

  button {
    cursor: pointer;
    padding: 0 ${t.size('xsm')} ${t.size('tiny')} ;
    font-size: ${t.size('xsm')};
    font-weight: bold;
    line-height: ${t.size('md')};
    color: ${t.colors.grey[400]};
  }
  
  button:hover {
    border-bottom: 2px solid ${t.colors.primary[400]};
    margin-bottom: -2px;
  }
  
  button.active {
    color: ${t.colors.primary[400]};
    border-bottom: 2px solid ${t.colors.primary[400]};
    margin-bottom: -2px;
  }
`;
const selectTab = (event:React.MouseEvent) => {
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i += 1) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  /* eslint-disable no-param-reassign */
  event.currentTarget.className += ' active';
};

export const LeaderboardNavTab: React.FC = () => {
  const { setCurrentSelector } = DashBoard.useContainer();

  return <NavTab className="tab">
    <button type="button" className="tablinks active" onClick={e => { selectTab(e); setCurrentSelector('day'); }}>DAY</button>
    <button type="button" className="tablinks" onClick={e => { selectTab(e); setCurrentSelector('week'); }}>WEEK</button>
    <button type="button" className="tablinks" onClick={e => { selectTab(e); setCurrentSelector('month'); }}>MONTH</button>
  </NavTab>;
};
