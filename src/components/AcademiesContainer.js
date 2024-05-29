import React, { useEffect } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import { server } from "../utlits/Variables";
import { Button, Input, Select } from "antd";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AcademyCardClient from "./AcademyCardClient";

const AcademiesContainer = () => {
  const apiContext = React.useContext(ApiContextProvider);

  const [loading, setLoading] = React.useState(true);

  const [types, setTypes] = React.useState([]);

  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes();
    setTypes(res?.data);
  };

  useEffect(() => {
    getAcademyTypes();
  }, []);

  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const [academies, setAcademies] = React.useState([]);

  const getAcademies = async () => {
    setLoading(true);
    try {
      const res = await apiContext?.getAcademies(name, type, {
        country,
        city,
        state,
      });
      setAcademies(res?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAcademies();
  }, []);

  useEffect(() => {
    apiContext?.getCountries();
  }, []);

  useEffect(() => {
    if (country) apiContext?.getCities(country);
  }, [country]);

  useEffect(() => {
    if (city) apiContext?.getStates(city);
  }, [city]);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 w-full max-w-6xl mx-auto mt-5 p-4">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="p-3 flex flex-col rounded-xl bg-white">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-bold">البحث</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full font rounded-xl p-3"
            type="text"
            placeholder="اسم الكلية"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg font-bold">نوع الاكاديمية</label>
          <Select size="large" value={type} onChange={(e) => setType(e)}>
            <Select.Option value={""}>{"أختر نوع الاكاديمية"}</Select.Option>
            {types?.map((type, index) => (
              <Select.Option key={index} value={type?.id}>
                {type?.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex md:w-1/3 flex-col gap-2 w-full">
            <label className="text-lg font-bold">الدولة</label>
            <Select
              size="large"
              value={country}
              onChange={(e) => setCountry(e)}
            >
              <Select.Option value={""}>{"أختر الدولة"}</Select.Option>
              {apiContext?.countries?.map((c, index) => (
                <Select.Option key={index} value={c?.id}>
                  {c?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex md:w-1/3 flex-col gap-2 w-full">
            <label className="text-lg font-bold">المدينة</label>
            <Select size="large" value={city} onChange={(e) => setCity(e)}>
              <Select.Option value={""}>{"أختر المدينة"}</Select.Option>
              {apiContext?.cities?.map((c, index) => (
                <Select.Option key={index} value={c?.id}>
                  {c?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex md:w-1/3 flex-col gap-2 w-full">
            <label className="text-lg font-bold">المنطقة</label>
            <Select size="large" value={state} onChange={(e) => setState(e)}>
              <Select.Option value={""}>{"أختر المنطقة"}</Select.Option>
              {apiContext?.states?.map((c, index) => (
                <Select.Option key={index} value={c?.id}>
                  {c?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-full max-w-[200px] flex flex-col">
          <Button
            size="large"
            className="font mt-3"
            onClick={getAcademies}
            type="primary"
          >
            بحث
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        {academies?.map((academy, index) => (
          <AcademyCardClient key={index} academy={academy} />
        ))}
      </div>
    </div>
  );
};

export default AcademiesContainer;
