import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { ApiContextProvider } from "../contexts/ApiContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Modal, Result, message } from "antd";
import { Alert } from "antd";
import CourtCard from "../components/CourtCard";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import Info from "../components/Info";
import Offers from "../components/Offers";
import ImagesAndVideos from "../components/ImagesAndVideos";
import FeaturesAndTools from "../components/FeaturesAndTools";
import { BiEdit } from "react-icons/bi";
import ManagerSettings from "./ManagerSettings";
import { useNavigate } from "react-router-dom";

const ManagerCourts = () => {
  const apiContext = useContext(ApiContextProvider);

  useEffect(() => {
    apiContext?.getUser();
  }, []);

  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const getCourts = async () => {
    setLoading(true);
    try {
      const res = await apiContext?.getCourts();
      setCourts(res.data);
    } catch (err) {
      setErr(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.getItem("token") && getCourts();
  }, []);

  const [createCourt, setCreateCourt] = useState(false);

  const [selected, setSelected] = useState("info");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [type, setType] = useState(null);
  const [openFrom, setOpenFrom] = useState("00:00:00");
  const [openTo, setOpenTo] = useState("00:00:00");
  const [closeFrom, setCloseFrom] = useState(null);
  const [closeTo, setCloseTo] = useState(null);
  const [ball, setBall] = useState(0);

  const [offerPrice, setOfferPrice] = useState("");
  const [offerFrom, setOfferFrom] = useState(null);
  const [offerTo, setOfferTo] = useState(null);

  const [eventPrice, setEventPrice] = useState("");
  const [eventFrom, setEventFrom] = useState(null);
  const [eventTo, setEventTo] = useState(null);

  const [selectedClosedTimes, setSelectedClosedTimes] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedVideos, setSelectedVideos] = useState([]);

  const [selectedTools, setSelectedTools] = useState([]);

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.error("يرجي التحقق من صحة الخانات المدخلة");
  };

  const success = () => {
    messageApi.success("تم انشاء الملعب بنجاح");
  };

  const createCourtFunction = async () => {
    const len = courts?.length;
    const limit = apiContext?.user?.manager_details?.courts_limit;

    if (len > limit) {
      alert("لقد تم تجاوز عدد الملاعب المسموح بها");
    } else {
      setLoading(true);
      try {
        // court, Images, Videos, Tools, Features
        const createCourt = await apiContext?.createCourt(
          name,
          address,
          locationUrl,
          pricePerHour,
          openFrom,
          openTo,
          closeFrom,
          closeTo,
          false,
          ball,
          offerPrice,
          offerFrom,
          offerTo,
          eventPrice,
          eventFrom,
          eventTo,
          country,
          city,
          state,
          type
        );

        if (createCourt?.data?.id) {
          const createCourtCloseTime = await apiContext?.createCourtCloseTime({
            data: selectedClosedTimes,
            court_id: createCourt?.data?.id,
          });

          const createCourtImage = await apiContext?.createCourtImage(
            createCourt?.data?.id,
            selectedImages
          );
          const createCourtVideo = await apiContext?.createCourtVideo(
            createCourt?.data?.id,
            selectedVideos
          );
          const createCourtTool = await apiContext?.createCourtTool(
            createCourt?.data?.id,
            selectedTools
          );
          const createCourtFeature = await apiContext?.createCourtFeature(
            createCourt?.data?.id,
            selectedFeatures
          );

          getCourts();
          setCreateCourt(false);
          success();
        } else {
          error();
          console.log(createCourt);
        }
      } catch (err) {
        error();
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteCourt = async (courtId) => {
    const deleteCourt = await apiContext?.deleteCourt(courtId);
    getCourts();
  };

  const [openSettings, setOpenSettings] = useState(false);

  const [checkProfile, setCheckProfile] = useState(null);

  const checkUser = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem("token"));
    setCheckProfile(res.data);
  };
  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch token only once
    if (token) {
      checkUser();
    }
  }, []);

  const navigate = useNavigate();

  if (checkProfile?.manager && !checkProfile?.manager?.can_courts) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="ليس لديك الصلاحية للدخول, لتفعيل حسابك وادارة الملاعب او الاكاديميات يرجي التواصل مع الدعم"
        extra={
          <Button
            href="https://wa.me/201229977573"
            className="font"
            type="primary"
          >
            الدعم
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {contextHolder}
      <Header />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="w-full flex gap-7 justify-between max-w-6xl mx-auto p-3">
        <p className="my-auto">اعدادات الملاعب</p>
        <span onClick={() => setOpenSettings(true)} className="updateIcon">
          <BiEdit />
        </span>
        <ManagerSettings open={openSettings} setOpen={setOpenSettings} />
      </div>

      <hr className="w-full flex gap-7 max-w-6xl mx-auto" />

      <div className="w-full flex flex-col gap-7 max-w-6xl mx-auto p-3">
        <div className="createCourt flex gap-3">
          <Button
            onClick={() => setCreateCourt(true)}
            type="primary"
            className="w-full max-w-[200px] bg-green-500"
          >
            <p className="font">+ اضافة ملعب</p>
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/manager/${checkProfile?.manager?.user_details?.username}/books/`
              )
            }
            type="primary"
            className="w-full max-w-[200px] bg-blue-500"
          >
            <p className="font">الحجوزات</p>
          </Button>
        </div>

        {/* Create court */}
        <Modal
          title="انشاء ملعب جديد"
          centered
          className="font"
          okText="انشاء"
          cancelText="الغاء"
          open={createCourt}
          onCancel={() => setCreateCourt(false)}
          width={1000}
          onOk={createCourtFunction}
        >
          <div className="z-50 mx-auto p-3 flex flex-col gap-2">
            <div
              id="switchs"
              className="switchs flex flex-row gap-3 max-w-full w-fit p-1 overflow-x-scroll"
            >
              <p
                className={`min-w-fit cursor-pointer ${selected === "info" ? "border-b-2 border-indigo-500" : ""} max-w-fit`}
                onClick={() => setSelected("info")}
              >
                المعلومات الاساسية
              </p>
              <p
                className={`min-w-fit cursor-pointer ${selected === "offers" ? "border-b-2 border-indigo-500" : ""} max-w-fit`}
                onClick={() => setSelected("offers")}
              >
                المناسبات والعروض
              </p>
              <p
                className={`min-w-fit cursor-pointer ${selected === "images" ? "border-b-2 border-indigo-500" : ""} max-w-fit`}
                onClick={() => setSelected("images")}
              >
                الصورة والفديوهات
              </p>
              <p
                className={`min-w-fit cursor-pointer ${selected === "features" ? "border-b-2 border-indigo-500" : ""} max-w-fit`}
                onClick={() => setSelected("features")}
              >
                الميزات والادوات
              </p>
            </div>
            {window.innerWidth <= 617 && (
              <div className="flex w-full p-1 justify-between">
                <span
                  className="p-1 cursor-pointer"
                  onClick={() => {
                    document.getElementById("switchs")?.scrollBy({
                      top: 0,
                      left: 50,
                      behavior: "smooth",
                    });
                  }}
                >
                  <ArrowRight />
                </span>
                <span
                  className="p-1 cursor-pointer"
                  onClick={() => {
                    document.getElementById("switchs")?.scrollBy({
                      top: 0,
                      left: -50,
                      behavior: "smooth",
                    });
                  }}
                >
                  <ArrowLeft />
                </span>
              </div>
            )}
            <hr />
            <div className="text-sm">
              <p>يرجي ملئ كل خانة لديها هذه العلامة (*)</p>
            </div>
            <hr />
            <form className="min-h-fit max-h-[400px] overflow-y-scroll">
              {selected === "info" && (
                <Info
                  name={name}
                  setName={setName}
                  address={address}
                  setAddress={setAddress}
                  locationUrl={locationUrl}
                  setLocationUrl={setLocationUrl}
                  pricePerHour={pricePerHour}
                  setPricePerHour={setPricePerHour}
                  openFrom={openFrom}
                  setOpenFrom={setOpenFrom}
                  openTo={openTo}
                  setOpenTo={setOpenTo}
                  closeFrom={closeFrom}
                  setCloseFrom={setCloseFrom}
                  closeTo={closeTo}
                  setCloseTo={setCloseTo}
                  ball={ball}
                  setBall={setBall}
                  country={country}
                  setCountry={setCountry}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  type={type}
                  setType={setType}
                  court={null}
                  selectedClosedTimes={selectedClosedTimes}
                  setSelectedClosedTimes={setSelectedClosedTimes}
                />
              )}
              {selected === "offers" && (
                <Offers
                  court={null}
                  offerPrice={offerPrice}
                  setOfferPrice={setOfferPrice}
                  offerFrom={offerFrom}
                  setOfferFrom={setOfferFrom}
                  offerTo={offerTo}
                  setOfferTo={setOfferTo}
                  eventPrice={eventPrice}
                  setEventPrice={setEventPrice}
                  eventFrom={eventFrom}
                  setEventFrom={setEventFrom}
                  eventTo={eventTo}
                  setEventTo={setEventTo}
                />
              )}
              {selected === "images" && (
                <ImagesAndVideos
                  images={null}
                  videos={null}
                  court={null}
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  selectedVideos={selectedVideos}
                  setSelectedVideos={setSelectedVideos}
                  getCourtImages={null}
                  getCourtVideo={null}
                />
              )}
              {selected === "features" && (
                <FeaturesAndTools
                  features={null}
                  tools={null}
                  court={null}
                  selectedFeatures={selectedFeatures}
                  setSelectedFeatures={setSelectedFeatures}
                  selectedTools={selectedTools}
                  setSelectedTools={setSelectedTools}
                  getCourtTools={null}
                  getCourtFeatures={null}
                />
              )}
            </form>
          </div>
        </Modal>

        {err && (
          <Alert
            className="w-full"
            type="error"
            message="حدث خطأ ما, يرجي التواصل مع خدمة العملاء"
          />
        )}
        <div className="courts flex flex-wrap justify-around gap-5">
          {courts?.length > 0
            ? courts?.map((court) => (
                <CourtCard
                  deleteCourt={deleteCourt}
                  key={court.id}
                  court={court}
                />
              ))
            : null}
          {courts?.length === 0 && !loading && (
            <Alert className="w-full" message="لا يوجد ملاعب" type="warning" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerCourts;
