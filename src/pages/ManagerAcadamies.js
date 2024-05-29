import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CreateAcademyButton from "../components/CreateAcademyButton";
import { ApiContextProvider } from "../contexts/ApiContext";
import { Backdrop, CircularProgress } from "@mui/material";
import AcademyCard from "../components/AcademyCard";
import { Button, Input, Result } from "antd";

const ManagerAcadamies = () => {
  const apiContext = useContext(ApiContextProvider);

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

  const [academies, setAcademies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = React.useState("");

  const getAcademies = async () => {
    setLoading(true);
    try {
      const res = await apiContext?.getAcademies(search, "", {});
      setAcademies(res?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProfile && getAcademies();
  }, [checkProfile]);

  if (
    checkProfile?.manager &&
    !checkProfile?.manager?.can_academy &&
    !checkProfile?.manager?.is_verified
  ) {
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
    <div className="flex flex-col">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header />
      <div className="flex flex-col gap-3 mt-5 p-5 w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* academies and create new one */}
          <div className="flex flex-col gap-3 md:w-fit w-full justify-center">
            <CreateAcademyButton getAcademies={getAcademies} />
          </div>

          {/* search */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <p>ابحث عن الاكاديميات بالاسم</p>
              <div className="w-full flex gap-3">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  width={"100%"}
                  placeholder="ادخل اسم الاكاديمية"
                />
                <Button onClick={getAcademies} size="xs" type="primary">
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* academies */}
        <div className="flex flex-wrap gap-5 p-5 justify-around bg-indigo-100 rounded-xl max-h-[700px] min-h-fit overflow-scroll">
          {academies?.length > 0 ? (
            academies?.map((academy) => (
              <AcademyCard
                key={academy?.id}
                academy={academy}
                getAcademies={getAcademies}
              />
            ))
          ) : (
            <p className="my-auto text-red-600">لا يوجد اكاديميات</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerAcadamies;
