import React, { useContext, useEffect } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { getCurrentDate } from "../utlits/Functions";
import dayjs from "dayjs";

const Renews = () => {
  const apiContext = useContext(ApiContextProvider);

  const location = useLocation();

  const subscribe = location?.state;

  useEffect(() => {
    if (subscribe) apiContext.getSubscriptionRenewalsDetail(subscribe?.id);
  }, [subscribe]);

  const renews = apiContext.subscriptionRenewalsDetail;

  const greaterRenewsID = renews?.reduce((acc, renew) => {
    if (renew?.id > acc) {
      return renew?.id;
    }
    return acc;
  }, 0);

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-3 md:p-5 p-2">
        <div className="flex flex-col gap-3 p-2 w-full max-w-[800px] mx-auto bg-white rounded-xl">
          <p>التجديدات...</p>
          <div className="flex flex-wrap justify-around gap-5">
            {renews?.map((renew) => (
              <div
                key={renew?.id}
                className={`
                    flex flex-col gap-3 p-3 rounded-md shadow-md border-2 from-amber-100 to-indigo-100 w-full sm:max-w-xs bg-gradient-to-br
                    ${greaterRenewsID === renew?.id ? "border-green-600" : "border-red-600"}
                `}
              >
                <div className="flex gap-3 justify-between items-center">
                  <p className="font-bold text-green-600 text-2xl">
                    {renew?.price} EGP
                  </p>
                  <small>
                    متبقي:
                    {dayjs(renew?.end_to).diff(
                      dayjs(getCurrentDate()),
                      "days"
                    )}{" "}
                    يوم
                  </small>
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    من: <b>{renew?.start_from}</b>
                  </p>
                  <p>
                    الي: <b>{renew?.end_to}</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renews;
