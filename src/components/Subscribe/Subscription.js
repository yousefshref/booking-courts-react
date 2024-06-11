import React, { useEffect } from "react";
import CreateOrUpdateSubscribePlanModal from "./CreateOrUpdateSubscribePlanModal";
import { ApiContextProvider } from "../../contexts/ApiContext";
import dayjs from "dayjs";

const Subscription = ({ subscripe }) => {
  const apiContext = React.useContext(ApiContextProvider);

  const [profile, setProfile] = React.useState({});

  const checkProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem("token"));
    setProfile(res?.data);
  };

  useEffect(() => {
    checkProfile();
  }, []);

  const [updateSubscripe, setUpdateSubscripe] = React.useState(false);

  return (
    <div className="flex flex-col p-5 rounded-xl bg-white shadow-lg shadow-indigo-50 w-full max-w-[400px]">
      {subscripe?.trainer && (
        <div className="flex gap-2 justify-between">
          <p>
            الاشتراك مع المدرب: <b>{subscripe?.trainer_details?.trainer}</b>
          </p>
          <p className="text-green-700">{subscripe?.price} EGP</p>
        </div>
      )}
      {subscripe?.academy_subscribe_plan && (
        <div className="flex gap-2 justify-between">
          <p>
            الاشتراك في:{" "}
            <b>{subscripe?.academy_subscribe_plan_details?.name}</b>
          </p>
          <p className="text-green-700">{subscripe?.price} EGP</p>
        </div>
      )}
      <hr className="py-[0.5px] my-2 bg-indigo-200" />
      <div className="flex flex-col gap-2">
        <p>بدأ في: {subscripe?.start_from}</p>
        <p>ينتهي في: {subscripe?.end_to}</p>
        {subscripe?.end_to && (
          <p>
            الايام المتبقية علي التجديد:{" "}
            {dayjs(subscripe.end_to).diff(dayjs(), "days")}
          </p>
        )}
      </div>
      <hr className="py-[0.5px] my-2 bg-indigo-200" />
      <button
        onClick={() => setUpdateSubscripe(true)}
        className="font bg-indigo-300 rounded-md hover:bg-indigo-400 transition-all cursor-pointer h-[50px]"
      >
        تفاصيل
      </button>
      <CreateOrUpdateSubscribePlanModal
        open={updateSubscripe}
        setOpen={setUpdateSubscripe}
        subscribe={subscripe}
      />
      {!profile?.user && (
        <button
          onClick={() => {
            apiContext?.deleteSubscribe(subscripe?.id).then(() => {
              apiContext?.getSubscriptions({});
            });
          }}
          className="font mt-2 bg-red-300 rounded-md hover:bg-red-400 transition-all cursor-pointer h-[50px]"
        >
          الفاء الاشتراك
        </button>
      )}
    </div>
  );
};

export default Subscription;
