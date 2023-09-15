import './Sidebar.module.css'
import AppNav from "./AppNav.jsx";
import Logo from "./Logo.jsx";
import s from './Sidebar.module.css'
import {Outlet} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <Logo/>
      <AppNav />

      <Outlet/>

      <footer className={s.footer}>
        <p className={s.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Marina Inc.
        </p>
      </footer>

    </div>
  );
};

export default Sidebar;
