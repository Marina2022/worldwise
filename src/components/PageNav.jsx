import React from 'react';
import {NavLink} from "react-router-dom";
import s from './PageNav.module.css'
import Logo from "./Logo.jsx";

const PageNav = () => {
  return (
    <nav className={s.nav}>
      <Logo/>
      <ul>
        <li><NavLink to={'/pricing'}>Pricing</NavLink></li>
        <li><NavLink to={'/product'}>Product</NavLink></li>
        <li><NavLink to={'/login'} className={s.ctaLink}>Login</NavLink></li>
      </ul>
    </nav>
  );
};

export default PageNav;
