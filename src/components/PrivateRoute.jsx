import {useAuth} from "../contexts/AuthProvider.jsx";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
  const {authenticated} = useAuth()

  return (
    authenticated ? children : <Navigate to='/'/>
  );
};

export default PrivateRoute;
