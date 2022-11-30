import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { currentContext } from "../../context/CurrentUser";

export const RequireAuth = ({ children }) => {
  const { userData } = useContext(currentContext);
  if (!userData) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};
