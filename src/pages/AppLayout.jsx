import s from './AppLayout.module.css'
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map.jsx";

const AppLayout = () => {
  return (
    <div className={s.app}>
      <Sidebar/>
      <Map/>
    </div>
  );
};

export default AppLayout;
