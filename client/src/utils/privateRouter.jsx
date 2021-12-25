import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./utils";

function PrivateRoute({ children }) {
    const auth = useAuth();

    return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
