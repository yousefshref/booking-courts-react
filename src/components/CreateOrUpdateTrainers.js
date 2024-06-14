import { Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import { FiDelete } from "react-icons/fi";
import { Backdrop, CircularProgress } from "@mui/material";
import { server } from "../utlits/Variables";

const CreateOrUpdateTrainers = ({ open, setOpen, trainer }) => {
  const apiContext = useContext(ApiContextProvider);

  useEffect(() => {
    apiContext?.getAcademyTypes();
  }, []);

  const [image, setImage] = useState(trainer?.image || "");
  const [trainerDetail, setTrainer] = useState(trainer?.trainer || "");
  const [type, setType] = useState(trainer?.type || "");
  const [pricePerClass, setPricePerClass] = useState(
    trainer?.price_per_class || 0
  );
  const [pricePerWeek, setPricePerWeek] = useState(
    trainer?.price_per_week || 0
  );
  const [pricePerMonth, setPricePerMonth] = useState(
    trainer?.price_per_month || 0
  );
  const [pricePerYear, setPricePerYear] = useState(
    trainer?.price_per_year || 0
  );

  useEffect(() => {
    if (trainer) {
      setImage(trainer?.image);
      setTrainer(trainer?.trainer);
      setType(trainer?.type);
      setPricePerClass(trainer?.price_per_class);
      setPricePerWeek(trainer?.price_per_week);
      setPricePerMonth(trainer?.price_per_month);
      setPricePerYear(trainer?.price_per_year);
    }
  }, [trainer]);

  useEffect(() => {
    if (open) apiContext?.getTrainers({});
  }, [open]);

  useEffect(() => {
    apiContext?.getUser();
  }, []);

  return (
    <Modal
      title="انشاء مدرب"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => {
        const len = apiContext?.trainers?.length;
        const limit = apiContext?.user?.manager_details?.trainer_limit;

        if (len >= limit) {
          alert("تم تجاوز حد المدربين");
        } else {
          const data = new FormData();

          if (image == "" || typeof image === "object") {
            data.append("image", image);
          }
          data.append("trainer", trainerDetail);
          data.append("type", type);
          data.append("price_per_class", pricePerClass);
          data.append("price_per_week", pricePerWeek);
          data.append("price_per_month", pricePerMonth);
          data.append("price_per_year", pricePerYear);

          if (trainer?.id) {
            apiContext?.updateTrainer(trainer?.id, data, setOpen);
          } else {
            apiContext?.createTrainer(data, setOpen);
          }
        }
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiContext?.trainerLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {apiContext?.messageApi}
      <div className="flex flex-col gap-5 overflow-y-scroll min-h-fit max-h-[600px]">
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">صورة المدرب</p>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {typeof image === "object" && image && image !== "" ? (
            <img src={URL.createObjectURL(image)} alt="" />
          ) : null}
          {typeof image === "string" && image && image !== "" ? (
            <img src={server + image} alt="" />
          ) : null}
          {image && (
            <span
              onClick={() => setImage("")}
              className="text-red-600 cursor-pointer"
            >
              <FiDelete />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">اسم المدرب</p>
          <input
            type="text"
            value={trainerDetail}
            onChange={(e) => setTrainer(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">نوع المدرب</p>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={""}>أختر نوع</option>
            {apiContext?.types.map((item, index) => (
              <option value={item?.id} key={index}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">سعر الحصة</p>
          <input
            type="number"
            value={pricePerClass}
            onChange={(e) => setPricePerClass(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">سعر الاسبوع</p>
          <input
            type="number"
            value={pricePerWeek}
            onChange={(e) => setPricePerWeek(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">سعر الشهر</p>
          <input
            type="number"
            value={pricePerMonth}
            onChange={(e) => setPricePerMonth(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700">سعر السنة</p>
          <input
            type="number"
            value={pricePerYear}
            onChange={(e) => setPricePerYear(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateTrainers;
