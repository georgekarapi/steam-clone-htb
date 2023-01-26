import React, { useContext } from 'react';
import { FaSteam } from 'react-icons/fa';
import { MdOutlineHome, MdStorefront, MdOutlineShoppingCart } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import NavIcon from './NavIcon';
import { GlobalContext } from '../utils/ContextProvider';

const activeClassName = 'w-full nav-icon-active';
const NavBar = () => {
  const { cart, setCart } = useContext(GlobalContext);
  return (
    <nav className="flex w-screen h-[20px] bottom-0 justify-between border-t-[1px] md:justify-start md:flex-col md:h-screen md:w-[80px] md:left-0 md:border-r-[1px] md:border-t-0 nav-bar border-neutral-800 fixed z-50">
      <FaSteam className="mb-8 hidden md:block" size="48px" color="white" />
      <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : 'w-full')}>
        <NavIcon iconComponent={<MdOutlineHome size="32px" />} />
      </NavLink>
      <NavLink to="store" className={({ isActive }) => (isActive ? activeClassName : 'w-full')}>
        <NavIcon iconComponent={<MdStorefront size="32px" />} />
      </NavLink>
      <NavLink to="cart" className={({ isActive }) => (isActive ? activeClassName : 'w-full')}>
        <NavIcon iconComponent={<MdOutlineShoppingCart size="32px" />} badgeCounter={cart && Object.keys(cart).length} />
      </NavLink>
    </nav>
  );
};

export default NavBar;
