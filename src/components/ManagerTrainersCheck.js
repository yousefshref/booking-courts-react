import { Backdrop, CircularProgress, Pagination } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Header from "./Header";
import ManagerLayout from "./Managers/ManagerLayout";
import { ApiContextProvider } from "../contexts/ApiContext";
import Loading from "./Loading";
import Trainer from "./Trainer";
import { useParams } from "react-router-dom";

const ManagerTrainersCheck = () => {
  const apiContext = useContext(ApiContextProvider);
  const params = useParams();

  useEffect(() => {
    apiContext?.getTrainers({
      manager: params?.academyId,
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Header />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiContext?.manaerAcademyPaginationLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ManagerLayout>
        <div className="flex flex-col gap-4">
          <div className="search"></div>
          <div className="flex flex-wrap gap-5 justify-around">
            {apiContext?.trainers?.map((trainer, index) => (
              <Trainer item={trainer} key={index} />
            ))}
          </div>
        </div>{" "}
      </ManagerLayout>
    </div>
  );
};

export default ManagerTrainersCheck;
