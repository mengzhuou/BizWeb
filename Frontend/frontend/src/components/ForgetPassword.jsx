import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [OTPsent, setOTPsent] = useState(false);
  const [OTPprompt, setOTPprompt] = useState([0, 0, 0, 0]);
  const email = useRef(null);

  const navigate = useNavigate();

  const onSubmitVerify = (e) => {
    e.preventDefault();
    let OTParr = [];

    for (let i = 0; i < 4; i++) {
      OTParr.push(e.target[i].value);
    }

    if (OTPprompt.join("") === OTParr.join("")) {
      sessionStorage.setItem("username", email.current.value);
      navigate("/resetPassword");
    } else {
      console.log("Wrong OTP" + OTParr.join("") + "---" + OTPprompt.join(""));
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const OTPdummy = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    setOTPprompt(OTPdummy);

    console.log(OTPdummy);
    axios
      .get(`/users/${email.current.value}`)
      .then((res) => {
        axios
          .post("/forgetPassword", {
            OTP: OTPdummy.join(""),
            recipient_email: email.current.value,
          })
          .then((res) => setOTPsent(true))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <form onSubmit={onSubmitOTP} className="flex flex-col">
        <label htmlFor="emailInput" className="m-1 font-bold">
          Your email:
        </label>
        <input
          id="emailInput"
          type="text"
          className="p-2 rounded-md m-1 w-64"
          ref={email}
        />
        <button type="submit"></button>
      </form>
      {OTPsent && (
        <form onSubmit={onSubmitVerify} className="flex gap-2 mt-10">
          <input
            className="w-10 h-10 rounded-md p-1 text-center"
            type="text"
            maxLength={1}
          />
          <input
            className="w-10 h-10 rounded-md p-1 text-center"
            type="text"
            maxLength={1}
          />
          <input
            className="w-10 h-10 rounded-md p-1 text-center"
            type="text"
            maxLength={1}
          />
          <input
            className="w-10 h-10 rounded-md p-1 text-center"
            type="text"
            maxLength={1}
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
