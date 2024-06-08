import { Button, Input, message, Modal, Popconfirm, Select } from "antd";
import React, { useEffect } from "react";
import { ApiContextProvider } from "../contexts/ApiContext";
import { server } from "../utlits/Variables";

const UpdateAcademy = ({ open, setOpen, getAcademies, academy }) => {
  const apiContext = React.useContext(ApiContextProvider);

  const [types, setTypes] = React.useState([]);
  const getAcademyTypes = async () => {
    const res = await apiContext?.getAcademyTypes();
    setTypes(res?.data);
  };
  useEffect(() => {
    getAcademyTypes();
  }, []);

  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");

  const [location, setLocation] = React.useState("");
  const [locationUrl, setLocationUrl] = React.useState("");
  const [website, setWebsite] = React.useState("");

  useEffect(() => {
    if (academy) {
      setImage(academy?.image);
      setName(academy?.name);
      setType(academy?.type);
      setCountry(academy?.country);
      setCity(academy?.city);
      setState(academy?.state);
      setLocation(academy?.location);
      setLocationUrl(academy?.location_url);
      setWebsite(academy?.website);
    }
  }, [academy]);

  const [messageApi, contextHolder] = message.useMessage();

  const error = (message) => {
    messageApi.error(message);
  };

  const updateAcademy = async () => {
    const data = new FormData();

    if (image && typeof image == "object") {
      data.append("image", image);
    }
    data.append("name", name);
    data.append("country", country);
    data.append("city", city);
    data.append("state", state);
    data.append("type", type);
    data.append("location", location);
    data.append("location_url", locationUrl);
    data.append("website", website);

    const res = await apiContext?.updateAcademy(academy?.id, data);
    if (res?.data?.id) {
      setOpen(false);
      getAcademies();
    } else {
      Object?.entries(res?.data || {}).forEach(([key, value]) =>
        error(`${key}: ${value?.join(", ")}`)
      );
    }
  };

  return (
    <Modal
      centered
      width={650}
      closeIcon={false}
      onOk={updateAcademy}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <div className="flex flex-col gap-3 max-h-[500px] bg-indigo-500 rounded-md p-3 min-h-fit overflow-scroll">
        <div className="flex flex-col p-3 rounded-md bg-white">
          <img
            src={server + image ? server + image : URL.createObjectURL(image)}
          />
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

        <Popconfirm
          title="هل تريد حذف هذه الاكاديمية"
          onConfirm={async () => {
            await apiContext?.deleteAcademy(academy?.id);
            await getAcademies();
            setOpen(false);
          }}
          okText="نعم"
          cancelText="لا"
        >
          <Button type="primary" className="w-full bg-red-500 font">
            حذف الاكاديمية
          </Button>
        </Popconfirm>
      </div>
    </Modal>
  );
};

export default UpdateAcademy;
