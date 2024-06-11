import React from "react";
import { useLocation } from "react-router-dom";
import { server } from "../utlits/Variables";

const PrintPage = () => {
  const location = useLocation();

  const item = location?.state;

  console.log(item);
  return (
    <div className="w-[100vw] flex flex-col h-[100vh] justify-center p-3 from-indigo-200 to-blue-300 bg-gradient-to-br items-center">
      <div className="print:hidden w-[100%] mb-2 max-w-[500px] flex flex-col justify-center gap-3">
        <button
          className="p-1 rounded-md bg-indigo-400 transition-all hover:bg-indigo-300"
          onClick={() => window.print()}
        >
          اطبع
        </button>
      </div>
      <div className="w-[100%] print:max-w-[100%] print:h-[100%] max-w-[500px] flex flex-col print:justify-around justify-center gap-3 bg-white p-2 rounded-xl">
        <div className="flex flex-col gap-1">
          <img
            className="w-full max-w-[200px] rounded-xl"
            src={server + item?.manager_details?.logo}
            alt=""
          />
          <p>{item?.manager_details?.brand_name}</p>
        </div>
        <hr className="w-full py-[0.5px] bg-red-700" />
        <div>
          <p>{item?.name}</p>
          <p>{item?.phone}</p>
          {item?.trainer && <p>المدرب: {item?.trainer_details?.trainer}</p>}
          {item?.academy_subscribe_plan && (
            <p>اكاديمية: {item?.academy_subscribe_plan_details?.name}</p>
          )}
        </div>
        <hr className="w-full py-[0.5px] bg-red-700" />
        <div>
          <p>
            يبدأ في: {item?.start_from} ينتهي في: {item?.end_to}
          </p>
          <p>السعر: {item?.price} EGP</p>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
