import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const appContext = useContext(AppContext);
  if(!appContext.initialised) {
    return;
  }
  return appContext.registeredState ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRouteElement;
