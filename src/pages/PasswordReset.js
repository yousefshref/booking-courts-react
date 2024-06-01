import { Button, Input } from "antd";
import React, { useContext, useState } from "react";

import { ApiContextProvider } from "../contexts/ApiContext";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const apiContext = useContext(ApiContextProvider);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const [codeSent, setCodeSent] = useState(false);

  const sendPassowrdResetCode = async (phone) => {
    setLoading(true);
    apiContext
      .sendPassowrdResetCode(phone)
      .then((res) => {
        if (res?.data?.success) {
          setCodeSent(true);
          alert("تم ارسال كود علي الواتس اب");
        }
        if (res?.data?.error) {
          alert(res?.data?.error);
        }
      })
      .finally(() => setLoading(false));
  };

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const resetPassword = async () => {
    setLoading(true);
    apiContext
      .resetPassword(phone, code, password)
      .then((res) => {
        if (res?.data?.success) {
          alert("تم تغيير كلمة المرور بنجاح");
          navigate("/auth/login/");
        }
        if (res?.data?.error) {
          alert(res?.data?.error);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex p-3 flex-col justify-center h-[100vh] items-center from-indigo-200 to-blue-200 bg-gradient-to-br">
      {loading && (
        <div className="absolute z-50 bg-indigo-500 bg-opacity-45 top-0 left-0 w-[100vw] h-[100vh] flex-col flex justify-center items-center">
          <Loading />
        </div>
      )}
      <div className="p-4 flex-col flex gap-3 rounded-xl bg-white w-full max-w-xl">
        <b>استرجاع كلمة المرور</b>
        <hr />
        {codeSent ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p>الرمز الذي تم ارساله لك في واتس اب</p>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="الكود هنا"
                size="large"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>كلمة المرور الجديدة</p>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="الكود هنا"
                size="large"
                type="text"
              />
            </div>
            <Button
              size="middle"
              className="w-full max-w-[150px]"
              type="primary"
              onClick={resetPassword}
            >
              تم
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p>رقم هاتفك</p>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="اكتب رقم هاتف حسابك"
              size="large"
              type="text"
            />
            <Button
              size="middle"
              className="w-full max-w-[150px]"
              type="primary"
              onClick={() => sendPassowrdResetCode(phone)}
            >
              ارسال الكود
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
