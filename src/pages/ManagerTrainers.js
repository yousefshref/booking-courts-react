import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Result } from "antd";
import CreateOrUpdateTrainers from "../components/CreateOrUpdateTrainers";
import { ApiContextProvider } from "../contexts/ApiContext";
import { server } from "../utlits/Variables";
import Trainer from "../components/Trainer";
import Loading from "../components/Loading";
import DisplaySubscriptions from "../components/Subscribe/DisplaySubscriptions";

const ManagerTrainers = () => {
  const apiContext = useContext(ApiContextProvider);

  useEffect(() => {
    apiContext?.getTrainers({});
  }, []);

  const [openTrainer, setOpenTrainer] = useState(false);
  const [openSubscribe, setOpenSubscribe] = useState(false);

  const [checkProfile, setCheckProfile] = useState(null);

  const checkUser = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem("token"));
    setCheckProfile(res.data);
  };
  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token only once
    if (token) {
      checkUser();
    }
  }, []);

  if (
    checkProfile?.manager &&
    !checkProfile?.manager?.can_private_trainer &&
    !checkProfile?.manager?.is_verified
  ) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="ليس لديك الصلاحية للدخول, لتفعيل حسابك وادارة الملاعب او الاكاديميات او المدربين يرجي التواصل مع الدعم"
        extra={
          <Button
            href="https://wa.me/201229977573"
            className="font"
            type="primary"
          >
            الدعم
          </Button>
        }
      />
    );
  }
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex flex-col gap-3 w-full max-w-5xl mx-auto mt-8 p-5">
        <div className="flex gap-3 justify-between my-auto">
          <p className="my-auto">المدربيين</p>
          <div className="flex gap-3 my-auto">
            <Button
              onClick={() => setOpenTrainer(true)}
              className="font bg-indigo-300"
              type="primary"
            >
              انشاء مدرب
            </Button>
            <CreateOrUpdateTrainers
              open={openTrainer}
              setOpen={setOpenTrainer}
            />

            <Button
              onClick={() => setOpenSubscribe(true)}
              className="font border-indigo-300"
              type="default"
            >
              الاشتراكات
            </Button>
            <DisplaySubscriptions
              open={openSubscribe}
              setOpen={setOpenSubscribe}
            />
          </div>
        </div>

        <hr />

        <div className="flex gap-6 flex-wrap justify-around">
          {apiContext?.trainerLoading ? (
            <Loading />
          ) : apiContext?.trainers?.length > 0 ? (
            apiContext?.trainers?.map((item, index) => (
              <Trainer item={item} key={index} />
            ))
          ) : (
            <p>لا يوجد مدربين</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerTrainers;
