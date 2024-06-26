import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  const navigate = useNavigate();

  const checkProfile = async () => {
    const res = await apiContext
      ?.checkProfile(localStorage.getItem("token"))
      .then((res) => {
        if (
          Object.keys(res.data).length <= 0 ||
          Object.keys(res.data).length <= 0
        ) {
          navigate("/auth/login");
        }
      });
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return children;
};

export default PrivateRoute;
