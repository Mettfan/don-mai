import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = ({ children }) => {
  const cookie = new Cookies();
  const user = cookie.get("user");

  return user ? children : <Navigate to="/register" />;
};

export default ProtectedRoute;