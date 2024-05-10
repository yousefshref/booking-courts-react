import React, { useContext, useEffect, useState } from "react";
import { Input } from "antd";
import { InputNumber } from "antd";
import { Select } from "antd";
import { ApiContextProvider } from "../contexts/ApiContext";
import dayjs from "dayjs";

const Info = ({
  court,
  name,
  setName,
  address,
  setAddress,
  locationUrl,
  setLocationUrl,
  pricePerHour,
  setPricePerHour,
  openFrom,
  setOpenFrom,
  openTo,
  setOpenTo,
  closeFrom,
  setCloseFrom,
  closeTo,
  setCloseTo,
  ball,
  setBall,
  country,
  setCountry,
  city,
  setCity,
  state,
  setState,
  type,
  setType,
  selectedClosedTimes,
  setSelectedClosedTimes,
}) => {
  const apiContext = useContext(ApiContextProvider);

  useEffect(() => {
    apiContext?.getCourtsTypes();
  }, []);

  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    const res = await apiContext?.getCountries();
    setCountries(res.data);
  };
  useEffect(() => {
    getCountries();
  }, []);

  const [cities, setCities] = useState([]);
  const getCities = async () => {
    const res = await apiContext?.getCities(country);
    setCities(res.data);
  };
  useEffect(() => {
    country && getCities();
  }, [country]);

  const [states, setStates] = useState([]);
  const getStates = async () => {
    const res = await apiContext?.getStates(city);
    setStates(res.data);
  };
  useEffect(() => {
    city && getStates();
  }, [city]);

  useEffect(() => {
    if (court !== null) {
      setName(court?.name);
      setAddress(court?.address);
      setLocationUrl(court?.location_url);
      setPricePerHour(court?.price_per_hour);
      setOpenFrom(court?.open_from);
      setOpenTo(court?.open_to);
      setCloseFrom(court?.close_from);
      setCloseTo(court?.close_to);
      setBall(court?.ball_price);
      setCountry(court?.country);
      setCity(court?.city);
      setState(court?.state);
      setType(court?.type);
      setSelectedClosedTimes(court?.close_times_details);
    }
  }, [court?.id]);

  return (
    <div className="my-3 flex flex-col gap-2 bg-zinc-200 rounded-md p-2 w-full">
      <div className="flex flex-col gap-1">
        <p>الاسم *</p>
        <Input
          className="p-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم الملعب"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>العنوان *</p>
        <Input
          className="p-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="عنوان الملعب"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>رابط خرائظ جوجل</p>
        <Input
          className="p-4"
          value={locationUrl}
          onChange={(e) => setLocationUrl(e.target.value)}
          placeholder="رابط خرائظ جوجل"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>الدولة *</p>
        <Select
          value={country}
          onChange={(e) => {
            if (e === "") {
              setCities([]);
              setStates([]);
              setCity("");
              setState("");
              setCountry("");
            } else {
              setCountry(e);
            }
          }}
        >
          <Select.Option value="">أختر الدولة</Select.Option>
          {countries?.map((country) => (
            <Select.Option key={country?.id} value={country?.id}>
              {country?.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <p>المدينة *</p>
        <Select
          value={city}
          onChange={(e) => {
            if (e === "") {
              setState("");
              setStates([]);
              setCity("");
            } else {
              setCity(e);
            }
          }}
        >
          <Select.Option value="">أختر المدينة</Select.Option>
          {cities?.map((city) => (
            <Select.Option key={city?.id} value={city?.id}>
              {city?.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <p>المنطقة *</p>
        <Select value={state} onChange={(e) => setState(e)}>
          <Select.Option value="">أختر المنطقة</Select.Option>
          {states?.map((state) => (
            <Select.Option key={state?.id} value={state?.id}>
              {state?.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <p>نوع الملعب *</p>
        <Select value={type} onChange={(e) => setType(e)}>
          <Select.Option value="">أختر النوع</Select.Option>
          {apiContext?.courtTypes?.map((type) => (
            <Select.Option key={type?.id} value={type?.id}>
              {type?.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <p>سعر الحجز بالساعة *</p>
        <InputNumber
          size="large"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e)}
          required
          addonAfter="EGP"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>يفتح من *</p>
        <div className="relative">
          <input
            value={openFrom?.slice(0, 5)}
            onChange={(e) => setOpenFrom(e.target.value)}
            type="time"
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-xl outline-none transition-all focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p>يفتح حتي *</p>
        <div className="relative">
          <input
            value={openTo?.slice(0, 5)}
            onChange={(e) => setOpenTo(e.target.value)}
            type="time"
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-xl outline-none transition-all focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p>الاووقات المغلقه</p>
        <div className="flex flex-col gap-3">
          {selectedClosedTimes?.length > 0 ? (
            selectedClosedTimes?.map((time, index) => (
              <div key={index} className="flex gap-3 items-center">
                <Input
                  onChange={(e) => {
                    setSelectedClosedTimes([
                      ...selectedClosedTimes.slice(0, index),
                      {
                        ...selectedClosedTimes[index],
                        time: e.target.value,
                      },
                    ]);
                  }}
                  type="time"
                  value={dayjs(
                    selectedClosedTimes[index]?.time,
                    "HH:mm"
                  ).format("HH:mm")}
                />
                <small
                  onClick={() => {
                    if (time?.id) {
                      apiContext?.deleteCourtCloseTime(time?.id).then((e) => {
                        if (e.data.success) {
                          setSelectedClosedTimes(
                            selectedClosedTimes.filter((t, i) => i !== index)
                          );
                        }
                      });
                    } else {
                      setSelectedClosedTimes(
                        selectedClosedTimes.filter((t, i) => i !== index)
                      );
                    }
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  حذف الوقت
                </small>
              </div>
            ))
          ) : (
            <p>لا يوجد اوقات مغلقة</p>
          )}
          <button
            onClick={() => {
              setSelectedClosedTimes([
                ...selectedClosedTimes,
                {
                  index:
                    selectedClosedTimes.length > 0
                      ? selectedClosedTimes.length + 1
                      : 0,
                  time: "00:00",
                },
              ]);
            }}
            type="button"
            className="text-black bg-teal-200 w-fit p-3 rounded-xl"
          >
            اضافة وقت مغلق
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p>
          سعر الكرة <small>(لو تركته فارغ هذا يعني انه لا يوجد كرة)</small>
        </p>
        <Input
          type="number"
          value={ball}
          onChange={(e) => setBall(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Info;
