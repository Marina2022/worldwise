import {NavLink} from "react-router-dom";
import s from './PageNav.module.css'
import Logo from "./Logo.jsx";
import {useAuth} from "../contexts/AuthProvider.jsx";
import User from "./User.jsx";

const PageNav = () => {
  const {authenticated} = useAuth()
  return (
    <nav className={s.nav}>
      <Logo/>
      <ul>
        <li><NavLink to={'/pricing'}>Pricing</NavLink></li>
        <li><NavLink to={'/product'}>Product</NavLink></li>
        <li>
          {
            // authenticated ?
            //   <User/> :
              <NavLink to={'/login'} className={s.ctaLink}>Login</NavLink>
          }
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
