import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContextProvider } from "../contexts/ApiContext";
import { Button, Dropdown, Modal } from "antd";

const Header = () => {
  const navigate = useNavigate();

  const apiContext = useContext(ApiContextProvider);

  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const res = await apiContext?.getUser();
      setUser(res?.data);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      window.location.reload();
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  const [checkProfile, setCheckProfile] = useState(null);
  const getCheckProfile = async () => {
    const res = await apiContext?.checkProfile(localStorage.getItem("token"));
    setCheckProfile(res?.data);
  };
  useEffect(() => {
    getCheckProfile();
  }, []);

  const notifications = apiContext?.notifications;

  useEffect(() => {
    apiContext?.getNotifications();
  }, []);

  const [openNotifications, setOpenNotifications] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            if (checkProfile?.manager) {
              navigate(`/manager/${user?.username}/`);
            } else if (checkProfile?.staff) {
              navigate(`/staff/${user?.username}/`);
            } else {
              navigate(`/profile/${user?.username}/`);
            }
          }}
          className="my-auto font"
        >
          الصفحة الشخصية
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex gap-2 my-auto"
          onClick={() => {
            setOpenNotifications(!openNotifications);
          }}
        >
          <p className="font my-auto">الرسائل</p>
          <span className="font text-blue-500">
            {notifications?.filter((n) => !n?.is_read)?.length}
          </span>
        </div>
      ),
    },
    {
      key: "3",
      label: user?.manager_details?.id && (
        <div
          onClick={() => {
            navigate(`/manager/${localStorage.getItem("username")}/balance/`);
          }}
        >
          <p>تفاصيل رصيد اليوم</p>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <p
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            navigate("/auth/login");
          }}
          className="font text-red-500"
        >
          تسجيل الخروج
        </p>
      ),
    },
  ];

  return (
    <header className="flex justify-between p-2 bg-white">
      <Modal
        open={openNotifications}
        onCancel={() => {
          notifications?.map(async (n) => {
            await apiContext?.updateNotification({
              id: n?.id,
              data: {
                is_read: true,
              },
            });
          });
          setOpenNotifications(false);
        }}
        footer={null}
        title="الرسائل"
        centered
        className="font"
      >
        <div className="flex flex-col gap-4 overflow-y-scroll min-h-fit max-h-[400px]">
          {notifications?.map((n) => (
            <div
              key={n?.id}
              className={`${n?.is_read && "opacity-50"} flex flex-col gap-1 my-2 p-3 rounded-xl from-indigo-200 to-blue-200 bg-gradient-to-tl`}
            >
              <p className="text-zinc-600 text-lg">{n?.description}</p>
              <small className="text-black">{n?.created_at}</small>
            </div>
          ))}
        </div>
      </Modal>

      <h3 className="text-2xl font-bold my-auto hidden md:flex">لينكاوي</h3>
      <div className="navs flex gap-2 my-auto">
        {checkProfile?.manager && (
          <>
            <p
              onClick={() => navigate(`/manager/${user?.username}/courts`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الملاعب
            </p>
            <p
              onClick={() => navigate(`/manager/${user?.username}/academies`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الأكاديميات
            </p>
            <p
              onClick={() => navigate(`/manager/${user?.username}/trainers/`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              المدربيين
            </p>

            <p
              onClick={() => navigate(`/manager/${user?.username}/staffs`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الموظفين
            </p>
            {/* <p onClick={() => navigate(`/manager/${user?.username}/settings`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الاعدادات</p> */}
          </>
        )}
        {checkProfile?.staff && (
          <>
            <p
              onClick={() => navigate(`/staff/${user?.username}/courts`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الملاعب
            </p>
            <p
              onClick={() => navigate(`/staff/${user?.username}/academies`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الأكاديميات
            </p>
            <p
              onClick={() => navigate(`/staff/${user?.username}/trainers/`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              المدربيين
            </p>
            <p
              onClick={() => navigate(`/staff/${user?.username}/books`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الحجوزات
            </p>
            {/* <p onClick={() => navigate(`/staff/${user?.username}/settings`)} className='cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm'>الاعدادات</p> */}
          </>
        )}
        {checkProfile?.user && (
          <>
            <p
              onClick={() => navigate(`/courts`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الملاعب
            </p>
            <p
              onClick={() => navigate(`/academies/`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              الأكاديميات
            </p>
            <p
              onClick={() => navigate(`/trainers/`)}
              className="cursor-pointer transition-all hover:text-blue-800 md:text-base text-sm"
            >
              المدربيين
            </p>
          </>
        )}
      </div>
      <div className="flex gap-1">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt={localStorage.getItem("username")}
              width={40}
              height={40}
            />
          </span>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
