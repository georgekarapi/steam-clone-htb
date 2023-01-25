import React from 'react';
import { FaSteam } from 'react-icons/fa';
import { MdOutlineHome, MdStorefront, MdPersonOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import NavIcon from './NavIcon';

const activeClassName = 'w-full nav-icon-active';
const NavBar = () => {
  return (
    <nav className="nav-bar border-r-neutral-800 fixed z-50">
      <FaSteam className="mb-8" size="48px" color="white" />
      <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : 'w-full')}>
        <NavIcon iconComponent={<MdOutlineHome size="32px" />} />
      </NavLink>
      <NavLink to="store" className={({ isActive }) => (isActive ? activeClassName : 'w-full')}>
        <NavIcon iconComponent={<MdStorefront size="32px" />} />
      </NavLink>
      <NavLink to="profile" className={({ isActive }) => (isActive ? activeClassName : 'w-full')}>
        <NavIcon iconComponent={<MdPersonOutline size="32px" />} />
      </NavLink>
    </nav>
  );
};

export default NavBar;
