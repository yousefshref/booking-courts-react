import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ApiContextProvider } from "../../contexts/ApiContext";

const UserRoute = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  const navigate = useNavigate();

  const checkProfile = async () => {
    const res = await apiContext
      ?.checkProfile(localStorage.getItem("token"))
      .then((res) => {
        if (!res?.data?.user) {
          navigate("/auth/login");
        }
      });
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return children;
};

export default UserRoute;
