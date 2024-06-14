import React, { useContext } from "react";
import { ApiContextProvider } from "../../contexts/ApiContext";
import { Delete } from "@mui/icons-material";
import CreateOrUpdateSubscribePlanModal from "./CreateOrUpdateSubscribePlanModal";
import { getCurrentDate } from "../../utlits/Functions";
import dayjs from "dayjs";

const TrainerSubscribeContainer = ({ sub }) => {
  const apiContext = useContext(ApiContextProvider);

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <tr
        onClick={() => setOpen(true)}
        className="bg-indigo-100 cursor-pointer hover:bg-indigo-200 transition-all"
        key={sub?.id}
      >
        <td>
          {sub?.trainer_details?.trainer ||
            sub?.academy_subscribe_plan_details?.name}
        </td>
        <td>{sub?.name}</td>
        <td>{sub?.phone}</td>
        <td>{sub?.birth_date}</td>
        <td>{sub?.price}</td>
        <td>{sub?.start_from}</td>
        <td>{sub?.end_to}</td>
        <td>{dayjs(sub?.end_to).diff(getCurrentDate(), "day")} يوم</td>
        <td>{sub?.is_approved ? "موافقة" : "غير موافقة"}</td>
        <td>
          <span
            className="cursor-pointer text-red-600"
            onClick={() => apiContext?.deleteSubscribe(sub?.id)}
          >
            <Delete fontSize="small" />
          </span>
        </td>
      </tr>

      <CreateOrUpdateSubscribePlanModal
        open={open}
        setOpen={setOpen}
        subscribe={sub}
      />
    </>
  );
};

export default TrainerSubscribeContainer;
