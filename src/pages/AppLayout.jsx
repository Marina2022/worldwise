import s from './AppLayout.module.css'
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";

const AppLayout = () => {
  return (
    <div className={s.app}>
      <User />
      <Sidebar/>
      <Map/>
    </div>
  );
};

export default AppLayout;
