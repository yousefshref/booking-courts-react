import React from "react";
import { ApiContextProvider } from "../../contexts/ApiContext";
import { FiDelete } from "react-icons/fi";
import { Button } from "antd";
import CreateOrUpdateSubscribePlanModal from "./CreateOrUpdateSubscribePlanModal";
import DisplaySubscriptions from "./DisplaySubscriptions";

const SubscribePlan = ({ plan, getSubscribePlans }) => {
  const apiContext = React.useContext(ApiContextProvider);

  const [createSubscribe, setCreateSubscribe] = React.useState(false);

  return (
    <div
      className="relative p-2 flex justify-between flex-col gap-1 rounded-xl bg-indigo-100 w-full"
      key={plan?.id}
    >
      <span
        onClick={() => {
          apiContext?.deleteSubscribePlan(plan?.id);
          getSubscribePlans();
        }}
        className="absolute deleteIcon left-1"
      >
        <FiDelete />
      </span>

      <p className="font-bold">{plan?.name}</p>
      <small className="font-bold">{plan?.description}</small>
      {plan?.price_per_class && (
        <small>{plan?.price_per_class} EGP / الحصة</small>
      )}
      {plan?.price_per_week && (
        <small>{plan?.price_per_week} EGP / الاسبوع</small>
      )}
      {plan?.price_per_month && (
        <small>{plan?.price_per_month} EGP / الشهر</small>
      )}
      {plan?.price_per_year && (
        <small>{plan?.price_per_year} EGP / السنة</small>
      )}

      <Button
        onClick={() => setCreateSubscribe(true)}
        type="primary"
        className="w-full font"
      >
        اشتراك
      </Button>

      <CreateOrUpdateSubscribePlanModal
        plan={plan}
        setOpen={setCreateSubscribe}
        open={createSubscribe}
      />
    </div>
  );
};

export default SubscribePlan;
