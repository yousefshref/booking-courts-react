import { Button, DatePicker, Input, Modal, Select } from "antd";
import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../../contexts/ApiContext";
import Subscription from "./Subscription";
import dayjs from "dayjs";
import Loading from "../Loading";
import { getCurrentDate } from "../../utlits/Functions";
import { Delete } from "@mui/icons-material";
import TrainerSubscribeContainer from "./TrainerSubscribeContainer";

const DisplaySubscriptions = ({
  open,
  setOpen,
  plan,
  isTrainers,
  isAcademies,
}) => {
  const apiContext = useContext(ApiContextProvider);

  const trainers = apiContext?.trainers;

  useEffect(() => {
    apiContext?.getTrainers({});
  }, []);

  const [academies, setAcademies] = React.useState([]);

  const getAcademies = async () => {
    const res = await apiContext?.getAcademies("", "", {});
    setAcademies(res?.data);
  };

  useEffect(() => {
    getAcademies();
  }, []);

  const subscriptions = apiContext?.subscriptions;

  const [subscriptionAcademy, setSubscriptionAcademy] = React.useState("");
  const [subscriptionTrainer, setSubscriptionTrainer] = React.useState("");
  const [subscriptionPhone, setSubscriptionPhone] = React.useState("");
  const [subscriptionDateFrom, setSubscriptionDateFrom] =
    React.useState(getCurrentDate());
  const [subscriptionDateTo, setSubscriptionDateTo] = React.useState("");
  const [isRequest, setIsRequest] = React.useState("");
  const [subscriptionStatus, setSubscriptionStatus] = React.useState("");

  useEffect(() => {
    apiContext?.getSubscriptions({
      plan_id: plan?.id,
      from_date: subscriptionDateFrom,
      to_date: subscriptionDateTo,
      is_approved: subscriptionStatus,
      requests_from_profile: isRequest,

      onlyAcademies: isAcademies && true,
      onlyTrainers: isTrainers && true,
    });
  }, [plan?.id]);

  return (
    <Modal
      centered
      width={1200}
      open={open}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      footer={null}
    >
      <div className="w-full flex flex-col gap-5 h-[100vh] max-h-[calc(100vh-100px)] overflow-y-scroll">
        <div className="flex flex-col gap-2 bg-indigo-200 p-4 rounded-xl mb-4">
          <div className="flex gap-3 md:flex-row flex-col w-full">
            <div className="flex flex-col gap-1 md:w-1/2">
              <p className="text-zinc-700">تاريخ بدأ الاشتراك</p>
              <DatePicker
                value={
                  subscriptionDateFrom
                    ? dayjs(subscriptionDateFrom, "YYYY-MM-DD")
                    : ""
                }
                onChange={(date, dateString) =>
                  date
                    ? setSubscriptionDateFrom(dateString)
                    : setSubscriptionDateFrom("")
                }
              />
            </div>
            <div className="flex flex-col gap-1 md:w-1/2">
              <p className="text-zinc-700">تاريخ نهاية الاشتراك</p>
              <DatePicker
                value={
                  subscriptionDateTo
                    ? dayjs(subscriptionDateTo, "YYYY-MM-DD")
                    : ""
                }
                onChange={(date, dateString) =>
                  date
                    ? setSubscriptionDateTo(dateString)
                    : setSubscriptionDateTo("")
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-700">اختر المدرب</p>
            <Select
              value={subscriptionTrainer}
              onChange={(e) => setSubscriptionTrainer(e)}
            >
              <Select.Option value="">ليس مهم</Select.Option>
              {trainers?.map((item, index) => (
                <Select.Option key={index} value={item?.id}>
                  {item?.trainer}
                </Select.Option>
              ))}
            </Select>
            {/* <Input type='number' value={subscriptionPhone} onChange={(e) => setSubscriptionPhone(e.target.value)} /> */}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-700">اختر الاكاديمية</p>
            <Select
              value={subscriptionAcademy}
              onChange={(e) => setSubscriptionAcademy(e)}
            >
              <Select.Option value="">ليس مهم</Select.Option>
              {academies?.map((item, index) => (
                <Select.Option key={index} value={item?.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
            {/* <Input type='number' value={subscriptionPhone} onChange={(e) => setSubscriptionPhone(e.target.value)} /> */}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-700">رقم الهاتف</p>
            <Input
              type="number"
              value={subscriptionPhone}
              onChange={(e) => setSubscriptionPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-700">الطلبات فقط</p>
            <Select value={isRequest} onChange={(e) => setIsRequest(e)}>
              <Select.Option value="">الكل</Select.Option>
              <Select.Option value={"True"}>نعم</Select.Option>
              <Select.Option value={"False"}>لا</Select.Option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-zinc-700">تم الموافقة علي الطلب</p>
            <Select
              value={subscriptionStatus}
              onChange={(e) => setSubscriptionStatus(e)}
            >
              <Select.Option value="">الكل</Select.Option>
              <Select.Option value={"True"}>نعم</Select.Option>
              <Select.Option value={"False"}>لا</Select.Option>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Button
              onClick={() => {
                apiContext?.getSubscriptions({
                  academy_id: subscriptionAcademy,
                  trainer_id: subscriptionTrainer,
                  plan_id: plan?.id,
                  from_date: subscriptionDateFrom,
                  to_date: subscriptionDateTo,
                  is_approved: subscriptionStatus,
                  requests_from_profile: isRequest,
                });
              }}
              className="w-fit"
              type="primary"
            >
              بحث
            </Button>
          </div>
        </div>

        <hr className="bg-indigo-700 py-[0.5px] my-2" />

        <div className="summerizeOfTotalEarn flex flex-wrap gap-5 justify-around">
          <p>
            المنتظر من طلبات الاشتراكات:{" "}
            {subscriptions
              ?.filter((sub) => sub?.request_from_profile && !sub?.is_approved)
              ?.reduce((a, b) => a + b?.price, 0)}{" "}
            EGP
          </p>
          <p>
            اجمالي المدفوع:{" "}
            {subscriptions
              ?.filter((sub) => sub?.is_approved)
              ?.reduce((a, b) => a + b?.price, 0)}{" "}
            EGP
          </p>
        </div>

        <hr className="bg-indigo-700 py-[0.5px] my-2" />

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-start w-full min-w-[100px]">
                مدرب/ اكاديمية
              </th>
              <th className="text-start w-full min-w-[100px]">الاسم</th>
              <th className="text-start w-full min-w-[100px]">رقم الهاتف</th>
              <th className="text-start w-full min-w-[100px]">تاريخ الميلاد</th>
              <th className="text-start w-full min-w-[100px]">السعر</th>
              <th className="text-start w-full min-w-[100px]">يبدء في</th>
              <th className="text-start w-full min-w-[100px]">ينتهي في</th>
              <th className="text-start w-full min-w-[100px]">
                متبقي من الايام
              </th>
              <th className="text-start w-full min-w-[100px]">الحالة</th>
              <th className="text-start w-full min-w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {subscriptions?.map((sub) => (
              <TrainerSubscribeContainer key={sub?.id} sub={sub} />
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default DisplaySubscriptions;
