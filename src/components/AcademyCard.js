import React, { useEffect } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import { Button } from "antd";
import { BiEdit } from "react-icons/bi";
import TimeComponent from "./TimeComponent";
import EditOrCreateTimeModal from "./EditOrCreateTimeModal";
import EditOrCreatePlanModal from "./EditOrCreatePlanModal";
import UpdateAcademy from "./UpdateAcademy";
import { server } from "../utlits/Variables";
import CreateOrUpdateSubscribePlanModal from "./Subscribe/CreateOrUpdateSubscribePlanModal";
import { FiDelete } from "react-icons/fi";
import SubscribePlan from "./Subscribe/SubscribePlan";

const AcademyCard = ({ academy, getAcademies }) => {
  const apiContext = React.useContext(ApiContextProvider);

  const [academyData, setAcademyData] = React.useState({});
  const getAcademy = async () => {
    const res = await apiContext?.getAcademy(academy?.id);
    setAcademyData(res?.data);
  };
  useEffect(() => {
    getAcademy();
  }, [academy]);

  const [timesData, setTimesData] = React.useState([]);
  const getAcademyTimes = async () => {
    const res = await apiContext?.getAcademyTimes(academyData?.id);
    setTimesData(res?.data);
  };
  useEffect(() => {
    academyData?.id && getAcademyTimes();
  }, [academyData?.id]);

  const [createTime, setCreateTime] = React.useState(false);

  const [subscribePlans, setSubscribePlans] = React.useState([]);

  const getSubscribePlans = async () => {
    const res = await apiContext?.getSubscribePlans(academyData?.id);
    setSubscribePlans(res?.data);
  };
  useEffect(() => {
    academyData?.id && getSubscribePlans();
  }, [academyData?.id, academyData]);

  const [createPlan, setCreatePlan] = React.useState(false);

  const [updateAcademy, setUpdateAcademy] = React.useState(false);

  const [createSubscribe, setCreateSubscribe] = React.useState(false);

  return (
    <div className="relative p-4 rounded-xl h-fit bg-white w-full max-w-xs flex flex-col gap-3">
      {!academy?.is_active && (
        <span className="w-fit p-2 rounded-full bg-red-500 text-white text-xs">
          قيد المراجعة
        </span>
      )}

      {academyData?.image && (
        <>
          <div className="flex rounded-xl">
            <img src={server + academyData?.image} className="rounded-xl" />
          </div>

          <hr />
        </>
      )}

      <div className="flex gap-1 justify-between">
        <b>{academyData?.name}</b>

        <span
          onClick={() => setUpdateAcademy(true)}
          className="edit text-blue-600 text-sm cursor-pointer"
        >
          <BiEdit />
        </span>

        <UpdateAcademy
          academy={academyData}
          getAcademies={getAcademies}
          open={updateAcademy}
          setOpen={setUpdateAcademy}
        />
      </div>

      <hr />
      <div className="times flex flex-col gap-1 text-xs">
        {timesData?.length > 0 ? (
          timesData?.map((time) => (
            <TimeComponent
              getAcademyTimes={getAcademyTimes}
              key={time?.id}
              time={time}
            />
          ))
        ) : (
          <p className="text-red-600">لا يوجد مواعيد</p>
        )}
        <Button
          type="primary"
          onClick={() => {
            setCreateTime(true);
          }}
          className="w-full bg-green-500 font"
        >
          أضف موعد
        </Button>

        <EditOrCreateTimeModal
          setOpen={setCreateTime}
          open={createTime}
          getAcademyTimes={getAcademyTimes}
          academy={academy}
          create={true}
        />
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-xs min-h-fit max-h-[500px] overflow-scroll">
        {subscribePlans?.length > 0 ? (
          subscribePlans?.map((plan) => (
            <SubscribePlan
              getSubscribePlans={getSubscribePlans}
              key={plan?.id}
              plan={plan}
            />
          ))
        ) : (
          <p className="text-red-600">لا يوجد خطت</p>
        )}
      </div>
      <hr />
      <div className="times flex flex-col gap-1 text-xs">
        <Button
          type="primary"
          onClick={() => {
            setCreatePlan(true);
          }}
          className="w-full bg-green-500 font"
        >
          أضف خطة جديدة
        </Button>

        <EditOrCreatePlanModal
          academy={academy}
          getSubscribePlans={getSubscribePlans}
          create={true}
          setOpen={setCreatePlan}
          open={createPlan}
        />
      </div>
    </div>
  );
};

export default AcademyCard;
