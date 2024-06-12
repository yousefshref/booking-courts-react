import React, { useEffect } from "react";
import { ApiContextProvider } from "../../contexts/ApiContext";
import { Modal } from "antd";
import { Backdrop, CircularProgress } from "@mui/material";
import { server } from "../../utlits/Variables";
import { getCurrentDate, getCurrentDateYMD } from "../../utlits/Functions";

const CreateOrUpdateSubscribePlanModal = ({
  open,
  setOpen,
  trainer,
  plan,
  subscribe, //subscribe model that has trainer or academy
}) => {
  const apiContext = React.useContext(ApiContextProvider);

  const user = apiContext?.user;
  useEffect(() => {
    apiContext?.getUser();
  }, []);

  const [manager, setManager] = React.useState();

  const [academy_subscribe_plan, setAcademySubscribePlan] = React.useState("");
  const [trainerId, setTrainer] = React.useState();

  const [playerImage, setPlayerImage] = React.useState("");
  const [birthCirtificate, setBirthCirtificate] = React.useState("");
  const [nationalIdImage1, setNationalIdImage1] = React.useState("");
  const [nationalIdImage2, setNationalIdImage2] = React.useState("");
  const [nationalIdParent1, setNationalIdParent1] = React.useState("");
  const [nationalIdParent2, setNationalIdParent2] = React.useState("");
  const [passportImage, setPassportImage] = React.useState("");

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [motherPhone, setMotherPhone] = React.useState("");
  const [fatherPhone, setFatherPhone] = React.useState("");

  const [price, setPrice] = React.useState("");
  const [startFrom, setStartFrom] = React.useState("");
  const [endTo, setEndTo] = React.useState("");

  const [requestFromProfile, setRequestFromProfile] = React.useState("");
  const [isApproved, setIsApproved] = React.useState(false);

  useEffect(() => {
    if (trainer) {
      setManager(trainer?.manager);
      setAcademySubscribePlan("");
      setTrainer(trainer?.id);
    }
  }, [trainer]);

  useEffect(() => {
    if (plan) {
      setManager(plan?.academy_details?.manager);
      setTrainer("");
      setAcademySubscribePlan(plan?.id);
    }
  }, [plan]);

  const createSubscription = () => {
    const data = new FormData();

    data.append("manager", manager);

    data.append("academy_subscribe_plan", academy_subscribe_plan);
    data.append("trainer", trainerId);

    data.append("player_image", playerImage);
    data.append("birth_cirtificate", birthCirtificate);
    data.append("national_id_image1", nationalIdImage1);
    data.append("national_id_image2", nationalIdImage2);
    data.append("national_id_parent1", nationalIdParent1);
    data.append("national_id_parent2", nationalIdParent2);
    data.append("passport_image", passportImage);

    data.append("name", name);
    data.append("phone", phone);
    data.append("birth_date", birthDate);
    data.append("gender", gender);
    data.append("mother_phone", motherPhone);
    data.append("father_phone", fatherPhone);

    data.append("price", price);
    data.append("start_from", startFrom);
    data.append("end_to", endTo);

    data.append("request_from_profile", requestFromProfile);
    data.append("is_approved", isApproved?.toString());

    apiContext
      ?.createSubscription(data)
      .then((e) => {
        if (e?.id) {
          setOpen(false);
          apiContext?.getSubscriptions({});
          alert("تم الاشتراك بنجاح, يرجي انتظار موافقة الاكاديمية");
          apiContext?.createIncome({
            manager: trainer?.manager || plan?.academy_details?.manager,
            amount: price,
            description: "اشتراك في اكاديمية او مع مدرب خاص",
          });
        } else {
          console.log(e);
          alert("هناك مشكلة يرجي مراجعة الخانات بدقة");
        }
      })
      .catch((e) => console.log(e));
  };

  // update

  useEffect(() => {
    if (user?.user_details?.id) {
      setRequestFromProfile(user?.user_details?.id);
    } else {
      setRequestFromProfile("");
    }
  }, [user]);

  useEffect(() => {
    if (subscribe) {
      setPlayerImage(subscribe?.player_image || "");
      setBirthCirtificate(subscribe?.birth_cirtificate || "");
      setNationalIdImage1(subscribe?.national_id_image1 || "");
      setNationalIdImage2(subscribe?.national_id_image2 || "");
      setNationalIdParent1(subscribe?.national_id_parent1 || "");
      setNationalIdParent2(subscribe?.national_id_parent2 || "");
      setPassportImage(subscribe?.passport_image || "");

      setName(subscribe?.name);
      setPhone(subscribe?.phone);
      setBirthDate(subscribe?.birth_date);
      setGender(subscribe?.gender);
      setMotherPhone(subscribe?.mother_phone);
      setFatherPhone(subscribe?.father_phone);

      setPrice(subscribe?.price);
      setStartFrom(subscribe?.start_from);
      setEndTo(subscribe?.end_to);

      setIsApproved(subscribe?.is_approved);
    }
  }, [subscribe]);

  const updateSubscription = () => {
    const data = new FormData();

    if (typeof playerImage === "object")
      data.append("player_image", playerImage);
    if (typeof birthCirtificate === "object")
      data.append("birth_cirtificate", birthCirtificate);
    if (typeof nationalIdImage1 === "object")
      data.append("national_id_image1", nationalIdImage1);
    if (typeof nationalIdImage2 === "object")
      data.append("national_id_image2", nationalIdImage2);
    if (typeof nationalIdParent1 === "object")
      data.append("national_id_parent1", nationalIdParent1);
    if (typeof nationalIdParent2 === "object")
      data.append("national_id_parent2", nationalIdParent2);
    if (typeof passportImage === "object")
      data.append("passport_image", passportImage);

    data.append("name", name);
    data.append("phone", phone);
    data.append("birth_date", birthDate);
    data.append("gender", gender);
    data.append("mother_phone", motherPhone);
    data.append("father_phone", fatherPhone);

    data.append("price", price);
    data.append("start_from", startFrom);
    data.append("end_to", endTo);

    data.append("is_approved", isApproved?.toString());

    apiContext
      ?.updateSubscription(subscribe?.id, data)
      .then((e) => {
        if (e?.id) {
          setOpen(false);
          apiContext?.getSubscriptions({});
          alert("تم تعديل الاشتراك بنجاح");
        } else {
          console.log(e);
          alert("هناك مشكلة يرجي مراجعة الخانات بدقة");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      onOk={() => {
        if (subscribe?.id) {
          updateSubscription();
        } else {
          createSubscription();
        }
      }}
      closeIcon={false}
    >
      {apiContext?.messageApi}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiContext?.loadingSubscriptions}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="flex flex-col gap-4 font min-h-fit max-h-[500px] overflow-y-scroll">
        {subscribe?.id ? (
          <button
            onClick={() =>
              apiContext
                ?.renewSubscription(subscribe?.id, {
                  subsribe: subscribe?.id,
                  price: subscribe?.price,
                  start_from: getCurrentDate(),
                  end_to: new Date(
                    new Date().setDate(new Date().getDate() + 30)
                  )
                    .toISOString()
                    .split("T")[0],
                })
                .then((e) => {
                  if (e?.id) {
                    alert("تم تجديد الاشتراك بنجاح");
                    setOpen(false);
                    apiContext?.getSubscriptions({});
                    apiContext?.createIncome({
                      manager: subscribe?.trainer_details?.manager,
                      amount: subscribe?.price,
                      description: "تجديد الاشتراك",
                    });
                  }
                })
                .then((e) => console.log(e))
            }
            className="p-1 rounded-md bg-green-400 transition-all hover:bg-green-300"
          >
            تجديد الاشتراك
          </button>
        ) : null}

        {!user?.user_details?.id && subscribe?.id ? (
          <button
            onClick={() => {
              apiContext?.navigate(`/print/${subscribe?.name}/`, {
                state: subscribe,
              });
            }}
            className="p-1 rounded-md bg-indigo-400 transition-all hover:bg-indigo-300"
          >
            طباعة ايصال
          </button>
        ) : null}

        {!user?.user_details?.id && subscribe?.id ? (
          <button
            onClick={() => {
              apiContext?.navigate(`/renews/${subscribe?.name}/`, {
                state: subscribe,
              });
            }}
            className="p-1 rounded-md bg-indigo-400 transition-all hover:bg-indigo-300"
          >
            التجديدات
          </button>
        ) : null}

        <div className="flex flex-col gap-2">
          <b>صور المشترك</b>
          <div className="flex flex-col">
            <p>صورة المشترك</p>
            <input
              onChange={(e) => setPlayerImage(e.target.files[0])}
              type="file"
            />
            {playerImage && typeof playerImage === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(playerImage)}
                alt={trainer?.trainer}
              />
            ) : null}
            {playerImage && typeof playerImage === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + playerImage}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p>صورة شهادة الميلاد</p>
            <input
              onChange={(e) => setBirthCirtificate(e.target.files[0])}
              type="file"
            />
            {birthCirtificate && typeof birthCirtificate === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(birthCirtificate)}
                alt={trainer?.trainer}
              />
            ) : null}
            {birthCirtificate && typeof birthCirtificate === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + birthCirtificate}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p>صورة وش البطاقة</p>
            <input
              onChange={(e) => setNationalIdImage1(e.target.files[0])}
              type="file"
            />
            {nationalIdImage1 && typeof nationalIdImage1 === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(nationalIdImage1)}
                alt={trainer?.trainer}
              />
            ) : null}
            {nationalIdImage1 && typeof nationalIdImage1 === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + nationalIdImage1}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p>صورة ظهر البطاقة</p>
            <input
              onChange={(e) => setNationalIdImage2(e.target.files[0])}
              type="file"
            />
            {nationalIdImage2 && typeof nationalIdImage2 === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(nationalIdImage2)}
                alt={trainer?.trainer}
              />
            ) : null}
            {nationalIdImage2 && typeof nationalIdImage2 === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + nationalIdImage2}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p>صورة وش بطاقة الاب</p>
            <input
              onChange={(e) => setNationalIdParent1(e.target.files[0])}
              type="file"
            />
            {nationalIdParent1 && typeof nationalIdParent1 === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(nationalIdParent1)}
                alt={trainer?.trainer}
              />
            ) : null}
            {nationalIdParent1 && typeof nationalIdParent1 === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + nationalIdParent1}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p>صورة ظهر بطاقة الاب</p>
            <input
              onChange={(e) => setNationalIdParent2(e.target.files[0])}
              type="file"
            />
            {nationalIdParent2 && typeof nationalIdParent2 === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(nationalIdParent2)}
                alt={trainer?.trainer}
              />
            ) : null}
            {nationalIdParent2 && typeof nationalIdParent2 === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + nationalIdParent2}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
          <div className="flex flex-col">
            <p>صورة باسبورت لو موجود</p>
            <input
              onChange={(e) => setPassportImage(e.target.files[0])}
              type="file"
            />
            {passportImage && typeof passportImage === "object" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={URL.createObjectURL(passportImage)}
                alt={trainer?.trainer}
              />
            ) : null}
            {passportImage && typeof passportImage === "string" ? (
              <img
                className="w-full max-w-[200px] mt-1 rounded-xl"
                src={server + passportImage}
                alt={trainer?.trainer}
              />
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <b>معلومات المشترك</b>

          <div className="flex flex-col">
            <p>اسم المشترك</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <p>رقم الهاتف</p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <p>تاريخ الميلاد</p>
            <input
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <p>الجنس</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full"
            >
              <option value="">اختر</option>
              <option value="ذكر">ذكر</option>
              <option value="انثى">انثى</option>
            </select>
          </div>

          <div className="flex flex-col">
            <p>رقم هاتف الام</p>
            <input
              type="text"
              value={fatherPhone}
              onChange={(e) => setFatherPhone(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <p>رقم هاتف الاب</p>
            <input
              type="text"
              value={motherPhone}
              onChange={(e) => setMotherPhone(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <b>معلومات الاشتراك</b>
          <div className="flex flex-col">
            <p>السعر</p>
            {trainer?.id && (
              <select
                className="w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">اختر</option>
                {trainer?.price_per_class && (
                  <option value={trainer?.price_per_class}>
                    {trainer?.price_per_class} / الحصة
                  </option>
                )}
                {trainer?.price_per_week && (
                  <option value={trainer?.price_per_week}>
                    {trainer?.price_per_week} / الاسبوع
                  </option>
                )}
                {trainer?.price_per_month && (
                  <option value={trainer?.price_per_month}>
                    {trainer?.price_per_month} / الشهر
                  </option>
                )}
                {trainer?.price_per_year && (
                  <option value={trainer?.price_per_year}>
                    {trainer?.price_per_year} / السنة
                  </option>
                )}
              </select>
            )}
            {plan?.id && (
              <select
                className="w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">اختر</option>
                {plan?.price_per_class && (
                  <option value={plan?.price_per_class}>
                    {plan?.price_per_class} / الحصة
                  </option>
                )}
                {plan?.price_per_week && (
                  <option value={plan?.price_per_week}>
                    {plan?.price_per_week} / الاسبوع
                  </option>
                )}
                {plan?.price_per_month && (
                  <option value={plan?.price_per_month}>
                    {plan?.price_per_month} / الشهر
                  </option>
                )}
                {plan?.price_per_year && (
                  <option value={plan?.price_per_year}>
                    {plan?.price_per_year} / السنة
                  </option>
                )}
              </select>
            )}
          </div>

          <div className="flex flex-col">
            <p>تاريخ بداية الاشتراك</p>
            <input
              value={startFrom}
              onChange={(e) => setStartFrom(e.target.value)}
              type="date"
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <p>تاريخ نهاية الاشتراك</p>
            <input
              value={endTo}
              onChange={(e) => setEndTo(e.target.value)}
              type="date"
              className="w-full"
            />
          </div>

          {user?.manager_details?.id && (
            <div className="flex flex-col">
              <p>هل تم الموافقة ؟</p>
              <select
                value={isApproved}
                onChange={(e) => setIsApproved(e.target.value)}
                className="w-full"
              >
                <option value="">اختر</option>
                <option value="true">نعم</option>
                <option value="false">لا</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrUpdateSubscribePlanModal;

// import { Button, DatePicker, Input, Modal, Select } from "antd";
// import React, { useEffect } from "react";
// import { server } from "../../utlits/Variables";
// import dayjs from "dayjs";
// import { ApiContextProvider } from "../../contexts/ApiContext";
// import axios from "axios";
// import { TiDelete } from "react-icons/ti";
// import { Backdrop, CircularProgress } from "@mui/material";

// const CreateOrUpdateSubscribePlanModal = ({
//   open,
//   setOpen,
//   plan,
//   subscripe,
//   trainer,
// }) => {
//   const apiContext = React.useContext(ApiContextProvider);

//   const [planDetail, setPlanDetail] = React.useState({});

//   const getPlanDetail = async () => {
//     const res = await axios.get(
//       `${server}academy-subscribe-plan/${plan?.id || subscripe?.academy_subscribe_plan}/`,
//       {
//         headers: {
//           Authorization: `Token ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     setPlanDetail(res?.data);
//   };

//   useEffect(() => {
//     if (plan || subscripe?.academy_subscribe_plan) getPlanDetail();
//   }, []);

//   useEffect(() => {
//     if (subscripe?.trainer) {
//       apiContext?.getTrainer(subscripe?.trainer);
//     }
//   }, [subscripe?.trainer]);

//   const [profile, setProfile] = React.useState({});

//   const checkProfile = async () => {
//     const res = await apiContext?.checkProfile(localStorage.getItem("token"));
//     setProfile(res?.data);
//   };

//   useEffect(() => {
//     checkProfile();
//   }, []);

//   const [academySubscribePlan, setAcademySubscribePlan] = React.useState(
//     plan?.id || subscripe?.academy_subscribe_plan || ""
//   );
//   const [trainerId, setTrainerId] = React.useState(
//     apiContext?.trainer?.id || subscripe?.trainer || trainer?.id || ""
//   );

//   const [playerImage, setPlayerImage] = React.useState(
//     subscripe?.player_image || ""
//   );
//   const [birthCirtificate, setBirthCirtificate] = React.useState(
//     subscripe?.birth_cirtificate || ""
//   );
//   const [nationalIdImage1, setNationalIdImage1] = React.useState(
//     subscripe?.national_id_image1 || ""
//   );
//   const [nationalIdImage2, setNationalIdImage2] = React.useState(
//     subscripe?.national_id_image2 || ""
//   );
//   const [nationalIdParent1, setNationalIdParent1] = React.useState(
//     subscripe?.national_id_parent1 || ""
//   );
//   const [nationalIdParent2, setNationalIdParent2] = React.useState(
//     subscripe?.national_id_parent2 || ""
//   );
//   const [passportImage, setPassportImage] = React.useState(
//     subscripe?.passport_image || ""
//   );

//   const [name, setName] = React.useState(subscripe?.name || "");
//   const [phone, setPhone] = React.useState(
//     !profile?.user
//       ? subscripe?.phone || ""
//       : profile?.user?.user_details?.phone || ""
//   );
//   const [birthDate, setBirthDate] = React.useState(subscripe?.birth_date || "");
//   const [gender, setGender] = React.useState(subscripe?.gender || "");
//   const [motherPhone, setMotherPhone] = React.useState(
//     subscripe?.mother_phone || ""
//   );
//   const [fatherPhone, setFatherPhone] = React.useState(
//     subscripe?.father_phone || ""
//   );

//   const [price, setPrice] = React.useState(subscripe?.price || "");

//   const [startFrom, setStartFrom] = React.useState(subscripe?.start_from || "");
//   const [endTo, setEndTo] = React.useState(subscripe?.end_to || "");

//   const [isApproved, setIsApproved] = React.useState(
//     subscripe?.is_approved || ""
//   );

//   useEffect(() => {
//     if (profile?.user) {
//       setPhone(
//         !profile?.user
//           ? subscripe?.phone || ""
//           : profile?.user?.user_details?.phone || ""
//       );
//     }
//   }, [profile?.user]);

//   const createSubscription = () => {
//     const formData = new FormData();

//     formData.append("academy_subscribe_plan", academySubscribePlan);
//     formData.append("trainer", trainerId);

//     if (playerImage == "" || typeof playerImage == "object")
//       formData.append("player_image", playerImage);
//     if (birthCirtificate == "" || typeof birthCirtificate == "object")
//       formData.append("birth_cirtificate", birthCirtificate);
//     if (nationalIdImage1 == "" || typeof nationalIdImage1 == "object")
//       formData.append("national_id_image1", nationalIdImage1);
//     if (nationalIdImage2 == "" || typeof nationalIdImage2 == "object")
//       formData.append("national_id_image2", nationalIdImage2);
//     if (nationalIdParent1 == "" || typeof nationalIdParent1 == "object")
//       formData.append("national_id_parent1", nationalIdParent1);
//     if (nationalIdParent2 == "" || typeof nationalIdParent2 == "object")
//       formData.append("national_id_parent2", nationalIdParent2);
//     if (passportImage == "" || typeof passportImage == "object")
//       formData.append("passport_image", passportImage);

//     formData.append("name", name);
//     formData.append("phone", phone);
//     formData.append("birth_date", birthDate);
//     formData.append("gender", gender);
//     formData.append("mother_phone", motherPhone);
//     formData.append("father_phone", fatherPhone);

//     formData.append("price", price);

//     formData.append("start_from", startFrom);
//     formData.append("end_to", endTo);

//     if (!profile?.user) {
//       formData.append("is_approved", true);
//     }

//     apiContext?.createSubscription(formData, setOpen).then((e) => {
//       if (e?.id) {
//         apiContext?.createIncome({
//           manager: e?.manager,
//           amount: e?.price,
//           description: `اشتراك مع مدرب ${trainer?.name} | ${e?.name} ورقم هاتف ${e?.phone}`,
//         });
//       }
//     });
//   };

//   const updateSubscription = () => {
//     const formData = new FormData();

//     if (playerImage == "" || typeof playerImage == "object")
//       formData.append("player_image", playerImage);
//     if (birthCirtificate == "" || typeof birthCirtificate == "object")
//       formData.append("birth_cirtificate", birthCirtificate);
//     if (nationalIdImage1 == "" || typeof nationalIdImage1 == "object")
//       formData.append("national_id_image1", nationalIdImage1);
//     if (nationalIdImage2 == "" || typeof nationalIdImage2 == "object")
//       formData.append("national_id_image2", nationalIdImage2);
//     if (nationalIdParent1 == "" || typeof nationalIdParent1 == "object")
//       formData.append("national_id_parent1", nationalIdParent1);
//     if (nationalIdParent2 == "" || typeof nationalIdParent2 == "object")
//       formData.append("national_id_parent2", nationalIdParent2);
//     if (passportImage == "" || typeof passportImage == "object")
//       formData.append("passport_image", passportImage);

//     if (name) formData.append("name", name);
//     if (phone) formData.append("phone", phone);
//     if (birthDate) formData.append("birth_date", birthDate);
//     if (gender) formData.append("gender", gender);
//     if (motherPhone) formData.append("mother_phone", motherPhone);
//     if (fatherPhone) formData.append("father_phone", fatherPhone);

//     if (price) formData.append("price", price);

//     if (startFrom) formData.append("start_from", startFrom);
//     if (endTo) formData.append("end_to", endTo);

//     formData.append("is_approved", isApproved);

//     apiContext?.updateSubscription(subscripe?.id, formData, setOpen);
//   };

//   return (
//     <Modal
//       centered
//       open={open}
//       onCancel={() => setOpen(false)}
//       width={600}
//       closeIcon={false}
//       onOk={() => {
//         if (subscripe?.id) {
//           updateSubscription();
//         } else {
//           createSubscription();
//         }
//       }}
//     >
//       {apiContext?.messageApi}

//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={apiContext?.loadingSubscriptions}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>

//       <div className="flex flex-col gap-4 font min-h-fit max-h-[500px] overflow-y-scroll">
//         {subscripe?.id && subscripe?.is_approved && !profile?.user ? (
//           <Button
//             onClick={() => {
//               apiContext
//                 ?.renewSubscription(subscripe?.id, setOpen)
//                 .then((e) => {
//                   if (e?.id) {
//                     apiContext?.createIncome({
//                       manager: e?.manager,
//                       amount: e?.price,
//                       description: `نجديد اشتراك في اكاديمية او مع مدرب خاص باسم ${e?.name} ورقم هاتف ${e?.phone}`,
//                     });
//                   }
//                 });
//             }}
//             className="font bg-indigo-300 h-[60px]"
//           >
//             تجديد الاشتراك
//           </Button>
//         ) : null}
//         {/* subscriptions */}
//         <div className="flex flex-col gap-2">
//           <p className="text-xl text-blue-600">معلومات الاشتراك</p>
//           <div className="flex flex-col">
//             {plan?.id || subscripe?.academy_subscribe_plan_details?.name ? (
//               <>
//                 <p className="text-zinc-600">اسم الخطة:</p>
//                 <p>
//                   {plan?.name ||
//                     subscripe?.academy_subscribe_plan_details?.name}
//                 </p>
//               </>
//             ) : null}
//             {apiContext?.trainer?.id && (
//               <>
//                 <p className="text-zinc-600">المدرب:</p>
//                 <p>{apiContext?.trainer?.trainer}</p>
//               </>
//             )}
//           </div>
//         </div>
//         <hr className="py-[0.5px] bg-indigo-200" />
//         {/* images */}
//         <div className="flex flex-col gap-2">
//           <p className="text-xl text-blue-600">صور الاشتراك</p>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">صورة اللاعب (اختياري):</p>
//             <Input
//               onChange={(e) => setPlayerImage(e.target.files[0])}
//               type="file"
//             />
//             {typeof playerImage === "string" && (
//               <img
//                 src={server + playerImage}
//                 alt={name || ""}
//                 className="rounded-3l w-full max-w-[200px]"
//               />
//             )}
//             {typeof playerImage === "object" && playerImage ? (
//               <img
//                 src={URL.createObjectURL(playerImage)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setPlayerImage("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-zinc-600">شهادة الميلاد (اختياري):</p>
//             <Input
//               onChange={(e) => setBirthCirtificate(e.target.files[0])}
//               type="file"
//             />
//             {typeof birthCirtificate === "string" && (
//               <img
//                 src={server + birthCirtificate}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             )}
//             {typeof birthCirtificate === "object" && birthCirtificate ? (
//               <img
//                 src={URL.createObjectURL(birthCirtificate)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setBirthCirtificate("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-zinc-600">وش صورة بطاقة اللاعب (اختياري):</p>
//             <Input
//               onChange={(e) => setNationalIdImage1(e.target.files[0])}
//               type="file"
//             />
//             {typeof nationalIdImage1 === "string" && (
//               <img
//                 src={server + nationalIdImage1}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             )}
//             {typeof nationalIdImage1 === "object" && nationalIdImage1 ? (
//               <img
//                 src={URL.createObjectURL(nationalIdImage1)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setNationalIdImage1("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-zinc-600">ظهر صورة بطاقة اللاعب (اختياري):</p>
//             <Input
//               onChange={(e) => setNationalIdImage2(e.target.files[0])}
//               type="file"
//             />
//             {typeof nationalIdImage2 === "string" && (
//               <img
//                 src={server + nationalIdImage2}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             )}
//             {typeof nationalIdImage2 === "object" && nationalIdImage2 ? (
//               <img
//                 src={URL.createObjectURL(nationalIdImage2)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setNationalIdImage2("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-zinc-600">
//               وش صورة بطاقة شخصية للوالد (اختياري):
//             </p>
//             <Input
//               onChange={(e) => setNationalIdParent1(e.target.files[0])}
//               type="file"
//             />
//             {typeof nationalIdParent1 === "string" && (
//               <img
//                 src={server + nationalIdParent1}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             )}
//             {typeof nationalIdParent1 === "object" && nationalIdParent1 ? (
//               <img
//                 src={URL.createObjectURL(nationalIdParent1)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setNationalIdParent1("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-zinc-600">
//               ظهر صورة بطاقة شخصية للوالد (اختياري):
//             </p>
//             <Input
//               onChange={(e) => setNationalIdParent2(e.target.files[0])}
//               type="file"
//             />
//             {typeof nationalIdParent2 === "string" && (
//               <img
//                 src={server + nationalIdParent2}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             )}
//             {typeof nationalIdParent2 === "object" && nationalIdParent2 ? (
//               <img
//                 src={URL.createObjectURL(nationalIdParent2)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setNationalIdParent2("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>

//           <div className="flex flex-col">
//             <p className="text-zinc-600">صورة جواز السفر (اختياري):</p>
//             <Input
//               onChange={(e) => setPassportImage(e.target.files[0])}
//               type="file"
//             />
//             {typeof passportImage === "string" && (
//               <img
//                 src={server + passportImage}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             )}
//             {typeof passportImage === "object" && passportImage ? (
//               <img
//                 src={URL.createObjectURL(passportImage)}
//                 alt={name || ""}
//                 className="rounded-xl w-full max-w-[200px]"
//               />
//             ) : null}
//             <span
//               onClick={() => setPassportImage("")}
//               className="flex gap-2 text-xs text-red-600 cursor-pointer"
//             >
//               <TiDelete className="my-auto" />
//               <p className="my-auto">حذف الصورة</p>
//             </span>
//           </div>
//         </div>
//         <hr className="py-[0.5px] bg-indigo-200" />
//         {/* infos */}
//         <div className="flex flex-col gap-2">
//           <p className="text-xl text-blue-600">معلومات المشترك</p>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">اسم المشترك:</p>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">رقم الهاتف:</p>
//             <Input
//               type="number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <small className="text-red-700">
//               لو قمت بتغييرة لرقم انت لست مسجل به في موقعنا لن تستطيع تتبع
//               اشتراك بنسبة كبيرة
//             </small>
//           </div>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">تاريخ الولادة:</p>
//             <DatePicker
//               value={birthDate ? dayjs(birthDate, "YYYY-MM-DD") : ""}
//               onChange={(e, date) =>
//                 e ? setBirthDate(date) : setBirthDate("")
//               }
//             />
//           </div>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">الجنس:</p>
//             <Select value={gender} onChange={(e) => setGender(e)}>
//               <Select.Option value="ذكر">ذكر</Select.Option>
//               <Select.Option value="انثى">انثى</Select.Option>
//             </Select>
//           </div>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">رقم هاتف الام (اختياري):</p>
//             <Input
//               type="number"
//               value={motherPhone}
//               onChange={(e) => setMotherPhone(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col">
//             <p className="text-zinc-600">رقم هاتف الاب (اختياري):</p>
//             <Input
//               type="number"
//               value={fatherPhone}
//               onChange={(e) => setFatherPhone(e.target.value)}
//             />
//           </div>
//         </div>
//         <hr className="py-[0.5px] bg-indigo-200" />
//         {/* last */}
//         <div className="flex flex-col gap-2">
//           <div className="flex flex-col">
//             <p className="text-zinc-600">سعر الاشتراك:</p>
//             <Select value={price} onChange={(e) => setPrice(e)}>
//               <Select.Option value="">أختر سعر الاشتراك</Select.Option>
//               {planDetail?.price_per_class && (
//                 <Select.Option value={planDetail?.price_per_class}>
//                   {planDetail?.price_per_class} EGP / في الحصة
//                 </Select.Option>
//               )}
//               {planDetail?.price_per_week && (
//                 <Select.Option value={planDetail?.price_per_week}>
//                   {planDetail?.price_per_week} EGP / في الاسبوع
//                 </Select.Option>
//               )}
//               {planDetail?.price_per_month && (
//                 <Select.Option value={planDetail?.price_per_month}>
//                   {planDetail?.price_per_month} EGP / في الشهر
//                 </Select.Option>
//               )}
//               {planDetail?.price_per_year && (
//                 <Select.Option value={planDetail?.price_per_year}>
//                   {planDetail?.price_per_year} EGP / في السنة
//                 </Select.Option>
//               )}
//               {apiContext?.trainer?.price_per_class && (
//                 <Select.Option value={apiContext?.trainer?.price_per_class}>
//                   {apiContext?.trainer?.price_per_class} EGP / في الحصة
//                 </Select.Option>
//               )}
//               {apiContext?.trainer?.price_per_week && (
//                 <Select.Option value={apiContext?.trainer?.price_per_week}>
//                   {apiContext?.trainer?.price_per_week} EGP / في الاسبوع
//                 </Select.Option>
//               )}
//               {apiContext?.trainer?.price_per_month && (
//                 <Select.Option value={apiContext?.trainer?.price_per_month}>
//                   {apiContext?.trainer?.price_per_month} EGP / في الشهر
//                 </Select.Option>
//               )}
//               {apiContext?.trainer?.price_per_year && (
//                 <Select.Option value={apiContext?.trainer?.price_per_year}>
//                   {apiContext?.trainer?.price_per_year} EGP / في السنة
//                 </Select.Option>
//               )}
//               {trainer?.price_per_class && (
//                 <Select.Option value={trainer?.price_per_class}>
//                   {trainer?.price_per_class} EGP / في الحصة
//                 </Select.Option>
//               )}
//               {trainer?.price_per_week && (
//                 <Select.Option value={trainer?.price_per_week}>
//                   {trainer?.price_per_week} EGP / في الاسبوع
//                 </Select.Option>
//               )}
//               {trainer?.price_per_month && (
//                 <Select.Option value={trainer?.price_per_month}>
//                   {trainer?.price_per_month} EGP / في الشهر
//                 </Select.Option>
//               )}
//               {trainer?.price_per_year && (
//                 <Select.Option value={trainer?.price_per_year}>
//                   {trainer?.price_per_year} EGP / في السنة
//                 </Select.Option>
//               )}
//             </Select>
//           </div>
//           {profile?.user ? null : (
//             <>
//               <div className="flex flex-col">
//                 <p className="text-zinc-600">هل تقبل طلب الاشتراك:</p>
//                 <Select value={isApproved} onChange={(e) => setIsApproved(e)}>
//                   <Select.Option value={true}>نعم</Select.Option>
//                   <Select.Option value={false}>لا</Select.Option>
//                 </Select>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-zinc-600">تاريخ بدايه الاشتراك:</p>
//                 <DatePicker
//                   value={startFrom ? dayjs(startFrom, "YYYY-MM-DD") : ""}
//                   onChange={(e, date) =>
//                     e ? setStartFrom(date) : setStartFrom("")
//                   }
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-zinc-600">تاريخ نهاية الاشتراك:</p>
//                 <DatePicker
//                   value={endTo ? dayjs(endTo, "YYYY-MM-DD") : ""}
//                   onChange={(e, date) => (e ? setEndTo(date) : setEndTo(""))}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreateOrUpdateSubscribePlanModal;
