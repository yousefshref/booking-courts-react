import React, { useEffect } from "react";
import Header from "../components/Header";
import ManagerProfileComponent from "../components/ManagerProfile/ManagerProfileComponent";
import ManagerUserInfoComponent from "../components/Managers/ManagerUserInfoComponent";
import { ApiContextProvider } from "../contexts/ApiContext";
import { getCurrentDate } from "../utlits/Functions";
import dayjs from "dayjs";

const Manager = () => {
  const apiContext = React.useContext(ApiContextProvider);

  // academies subscriptions
  const subscriptions = apiContext?.subscriptions;

  useEffect(() => {
    apiContext?.getSubscriptions({});
  }, []);

  useEffect(() => {
    subscriptions?.map((sub) => {
      const daysAfterDecrease = dayjs(sub?.end_date)
        .subtract(7, "day")
        .toDate();
      const today = getCurrentDate();

      const endDate = dayjs(sub?.end_date).subtract(7, "day").toDate();

      console.log(new Date(today));
      console.log(new Date(daysAfterDecrease));

      if (new Date(today) >= new Date(daysAfterDecrease)) {
        apiContext?.createNotification({
          user: sub?.manager_details?.user,
          description: `متبقي 7 ايام لتجديد اشتراك اللاعب ${sub?.name} رقم هاتف ${sub?.phone} سوف ينتهي في ${dayjs(
            endDate
          ).format("YYYY-MM-DD")}`,
        });
      }
    });
  }, [subscriptions]);

  return (
    <div className="flex flex-col gap-5">
      <Header />

      <div className="flex flex-col gap-8 p-5 w-full max-w-5xl mx-auto">
        <ManagerProfileComponent />

        <ManagerUserInfoComponent />
      </div>
    </div>
  );
};

export default Manager;
