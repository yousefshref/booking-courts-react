import { Button, Input, message, Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import DisplaySubscriptions from "../components/Subscribe/DisplaySubscriptions";

const CreateAcademyButton = ({ getAcademies }) => {
  const apiContext = useContext(ApiContextProvider);

  const [open, setOpen] = useState(false);

  const [types, setTypes] = useState([]);
  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes();
    setTypes(res?.data);
  };
  useEffect(() => {
    getAcademyTypes();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };

  const success = (message) => {
    messageApi.success(message);
  };

  useEffect(() => {
    apiContext?.getAcademies();
  }, []);

  useEffect(() => {
    apiContext?.getUser();
  }, []);

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [location, setLocation] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [website, setWebsite] = useState("");

  const createAcademy = async () => {
    const len = apiContext?.academies?.length;
    const limit = apiContext?.user?.manager_details?.academy_limit;

    if (len >= limit) {
      alert(
        "لا يمكنك انشاء اكاديمية جديدة لانك تجاوزت الحد الادنى لعدد الاكاديميات المسجلة"
      );
    } else {
      const data = new FormData();

      data.append("image", image);
      data.append("name", name);
      data.append("country", country);
      data.append("city", city);
      data.append("state", state);
      data.append("type", type);
      data.append("location", location);
      data.append("location_url", locationUrl);
      data.append("website", website);

      const res = await apiContext?.createAcademy(data);
      if (res?.data?.id) {
        setOpen(false);
        getAcademies();
        success("تم انشاء الاكاديمية بنجاح");
        setName("");
        setType("");
        setLocation("");
        setLocationUrl("");
        setWebsite("");
      } else {
        Object?.entries(res?.data || {}).forEach(([key, value]) =>
          error(`${key}: ${value?.join(", ")}`)
        );
      }
    }
  };

  const [openSubs, setOpenSubs] = React.useState(false);

  useEffect(() => {
    apiContext?.getCountries();
  }, []);

  useEffect(() => {
    if (country) apiContext?.getCities(country);
  }, [country]);

  useEffect(() => {
    if (city) apiContext?.getStates(country, city);
  }, [city]);

  return (
    <div className="createAcademy">
      {contextHolder}

      <div className="flex flex-row gap-4 ">
        <Button
          onClick={() => setOpen(true)}
          className="bg-green-500 font"
          type="primary"
          size="large"
        >
          انشاء اكاديمية
        </Button>
        <Button
          onClick={() => setOpenSubs(true)}
          className="font"
          type="default"
          size="large"
        >
          المشتركين
        </Button>
        <DisplaySubscriptions open={openSubs} setOpen={setOpenSubs} />
      </div>

      <Modal
        centered
        width={650}
        closeIcon={false}
        open={open}
        onOk={createAcademy}
        onCancel={() => setOpen(false)}
      >
        <div className="flex flex-col gap-3 max-h-[500px] bg-indigo-500 rounded-md p-3 min-h-fit overflow-scroll">
          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>صورة للأكاديمية</p>
            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="اسم الاكاديمية"
              className="w-full"
            />
          </div>

          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>اسم الاكاديمية *</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسم الاكاديمية"
              className="w-full"
            />
          </div>

          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>نوع الاكاديمية *</p>
            <Select value={type} onChange={(e) => setType(e)}>
              <Select.Option value="">أختر نوع الاكاديمية</Select.Option>
              {types?.map((type, index) => (
                <Select.Option key={index} value={type?.id}>
                  {type?.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>البلد *</p>
            <Select value={country} onChange={(e) => setCountry(e)}>
              <Select.Option value="">أختر بلد الاكاديمية</Select.Option>
              {apiContext?.countries?.map((country, index) => (
                <Select.Option key={index} value={country?.id}>
                  {country?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          {country && (
            <div className="flex flex-col p-3 rounded-md bg-white">
              <p>المدينة *</p>
              <Select value={city} onChange={(e) => setCity(e)}>
                <Select.Option value="">أختر مدينة الاكاديمية</Select.Option>
                {apiContext?.cities?.map((city, index) => (
                  <Select.Option key={index} value={city?.id}>
                    {city?.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
          {city && (
            <div className="flex flex-col p-3 rounded-md bg-white">
              <p>المنطقة *</p>
              <Select value={state} onChange={(e) => setState(e)}>
                <Select.Option value="">أختر منطقة الاكاديمية</Select.Option>
                {apiContext?.states?.map((city, index) => (
                  <Select.Option key={index} value={city?.id}>
                    {city?.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}

          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>عنوان الاكاديمية *</p>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="عنوان الاكاديمية"
              className="w-full"
            />
          </div>

          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>رابط خرائظ جوجل (أختياري)</p>
            <Input
              value={locationUrl}
              onChange={(e) => setLocationUrl(e.target.value)}
              placeholder="رابط خرائط جوجل"
              className="w-full"
            />
          </div>

          <div className="flex flex-col p-3 rounded-md bg-white">
            <p>موقع الكتروني (أختياري)</p>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="موقع الكتروني"
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateAcademyButton;
