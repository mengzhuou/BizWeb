import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const [OTPsent, setOTPsent] = useState(false);
  const [OTPprompt, setOTPprompt] = useState([0, 0, 0, 0]);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const email = useRef(null);

  const navigate = useNavigate();

  const onSubmitVerify = async (e) => {
    e.preventDefault();
    let OTParr = [];

    for (let i = 0; i < 4; i++) {
      OTParr.push(e.target[i].value);
    }

    if (OTPprompt.join("") === OTParr.join("")) {
      sessionStorage.setItem("username", email.current.value);
      console.log("Correct OTP entered");
      try {
        await axios("/auth/singleuse", {
          method: "POST",
          username: email.current.value,
          OPT: OTParr.join(""),
          withCredentials: true,
        });
        console.log("asdsad");
        navigate("/resetPassword");
      } catch (err) {
        console.log("interesting " + err);
      }
    } else {
      setErr("Wrong OTP entered");
      console.log("Wrong OTP" + OTParr.join("") + "---" + OTPprompt.join(""));
    }
  };

  useEffect(() => {
    console.log(user);
    if (user !== null) {
      const OTPdummy = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
      setOTPprompt(OTPdummy);
      console.log(OTPdummy);
      axios
        .post("/forgetPassword", {
          OTP: OTPdummy.join(""),
          recipient_email: email.current.value,
        })
        .then((res) => {
          console.log("asdsadsa");
          setOTPsent(true);
          setErr(null);
        })
        .catch((err) => {
          console.log(err.message);
          setErr(err.message);
        });
    }
  }, [user]);

  const onSubmitOTP = async (e) => {
    e.preventDefault();

    axios
      .get(`/users/${email.current.value}`)
      .then((res) => {
        setUser(res.data.username);
        setErr(null);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setUser(null);
        setErr(err.response.data.message);
      });
    console.log("------------------onSubmitOTP-----------");
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
          className="p-2 rounded-md m-1 w-64 focus:outline-none"
          ref={email}
        />
        <button type="submit"></button>
      </form>
      {OTPsent && !err && (
        <>
          <div>
            <br />A verification code has been sent to your email at{" "}
            {email.current.value}
          </div>
          <form onSubmit={onSubmitVerify} className="flex flex-col">
            <div className="flex gap-2 mt-6">
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
            </div>
            <button
              type="submit"
              className="mt-5 bg-white rounded-md font-bold p-1"
            >
              Verify
            </button>
          </form>
        </>
      )}
      {err && <div className="text-red-600 font-bold text-lg">{err}</div>}
    </div>
  );
};

export default ForgetPassword;
