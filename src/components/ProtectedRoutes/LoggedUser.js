import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { currentContext } from "../../context/CurrentUser";

export const LoggedUser = ({ children }) => {
  const { userData } = useContext(currentContext);

  if (userData) {
    return <Navigate to="/home"></Navigate>;
  }
  return children;
};
