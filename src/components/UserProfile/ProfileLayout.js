import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ApiContextProvider } from "../../contexts/ApiContext";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { server } from "../../utlits/Variables";

const ProfileLayout = ({ children }) => {
  const apiContext = useContext(ApiContextProvider);

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const checkProfile = async () => {
    setLoading(true);
    try {
      const res = await apiContext?.checkProfile(localStorage.getItem("token"));
      setProfile(res?.data?.user);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkProfile();
  }, []);

  const pathName = window.location.pathname;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />
      <div className="flex flex-col gap-5 p-4 w-full max-w-6xl mx-auto">
        <div className="profile p-3 flex gap-3 flex-wrap h-fit justify-between bg-white rounded-md">
          <div className="flex gap-3 justify-around flex-wrap w-full">
            <span className="w-full max-w-[250px] rounded-full overflow-hidden">
              {profile?.profile_image ? (
                <img
                  className="w-full"
                  src={server + profile?.profile_image}
                  alt={profile?.user_details?.username}
                />
              ) : (
                <img
                  className="w-full"
                  src={
                    "https://previews.123rf.com/images/blankstock/blankstock2303/blankstock230301517/200668125-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-neutral-gender.jpg"
                  }
                  alt={profile?.user_details?.username}
                />
              )}
            </span>
            <div className="my-auto w-fit text-center">
              <h3 className="text-3xl text-zinc-600">
                {profile?.user_details?.username}
              </h3>
              <p>{profile?.user_details?.email}</p>
              <p>{profile?.user_details?.phone}</p>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="p-5 flex flex-wrap gap-5 justify-around rounded-xl bg-indigo-200">
          <p
            onClick={() =>
              navigate(
                `/profile/${localStorage.getItem("username")?.replace(" ", "-")}/`
              )
            }
            className={`${pathName?.includes("profile") && !pathName?.includes("academies") && !pathName?.includes("trainers") ? "bg-lime-200" : "bg-white hover:bg-lime-200"} cursor-pointer p-3 rounded-xl  w-full max-w-[400px] text-center transition-all `}
          >
            الحجوزات
          </p>
          <p
            onClick={() =>
              navigate(
                `/profile/${localStorage.getItem("username")?.replace(" ", "-")}/academies/`
              )
            }
            className={`${pathName?.includes("profile") && pathName?.includes("academies") ? "bg-lime-200" : "bg-white hover:bg-lime-200"} cursor-pointer p-3 rounded-xl  w-full max-w-[400px] text-center transition-all `}
          >
            اشتراك الاكاديميات/ المدربين
          </p>
        </div>

        <hr className="my-3" />

        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
