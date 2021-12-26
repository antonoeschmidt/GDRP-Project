import React, { useContext} from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { loggedIn, loading } = useContext(AuthContext)
    return loggedIn ?  (children)  : (loading ? 'Loading..' :  <Navigate to="/login" />);
}

export default PrivateRoute;
