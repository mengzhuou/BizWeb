import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const refOldPass = useRef(null);
  const refNewPass = useRef(null);
  const refConfirmNewPass = useRef(null);
  const location = useLocation();
  const [err, setErr] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [passVisibility, setPassVisibility] = useState([false, false, false]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    axios("/users/resetPassword", {
      method: "PATCH",
      data: {
        username: location.state.curUser,
        oldPassword: refOldPass.current.value,
        newPassword: refNewPass.current.value,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log("a");
        console.log(res);
        setResetSuccess(true);
        setErr(null);
      })
      .catch((err) => {
        console.log("b");
        console.log(err.response.data.message);
        setResetSuccess(false);
        setErr(err.response.data.message);
      });
  };

  const handleToggleVisibility = (ind) => {
    setPassVisibility((prev) =>
      prev.map((item, index) => (index === ind ? !item : item))
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold">Reset Password</h1>
          <form
            onSubmit={handleResetPassword}
            className="grid grid-cols-2 gap-10 mt-10 pl-5 mr-3"
          >
            <label htmlFor="">Old Password:</label>{" "}
            <div className="flex gap-3">
              <input
                type={passVisibility[0] ? "text" : "password"}
                className="h-10 rounded-md p-1"
                ref={refOldPass}
              />
              <button type="button" onClick={() => handleToggleVisibility(0)}>
                Show
              </button>
            </div>
            <label htmlFor="">New Password:</label>{" "}
            <div className="flex gap-3">
              <input
                type={passVisibility[1] ? "text" : "password"}
                className="h-10 rounded-md p-1"
                ref={refNewPass}
              />
              <button type="button" onClick={() => handleToggleVisibility(1)}>
                Show
              </button>
            </div>
            <label htmlFor="">Confirm New Password:</label>{" "}
            <div className="flex gap-3">
              <input
                type={passVisibility[2] ? "text" : "password"}
                className="h-10 rounded-md p-1"
                ref={refConfirmNewPass}
              />
              <button type="button" onClick={() => handleToggleVisibility(2)}>
                Show
              </button>
            </div>
            <div></div>
            <button
              type="submit"
              className="p-1 bg-blue-400 text-white rounded-md font-bold"
            >
              Reset
            </button>
          </form>
        </div>
        <div className="bg-white rounded-md p-3">
          <h1 className="font-bold text-red-600">NEW PASSWORD REQUIREMENTS</h1>
          <br />
          <p>At least 8 characters</p>
          <br />
          <p>At least one Numeric digit (0,9)</p>
          <br />
          <p>At least one lower case letter</p>
          <br />
          <p>At least one upper case letter</p>
          <br />
          <p>At least one special character (@#$%)</p>
          <br />
        </div>
      </div>
      {err && <p className="ml-80 mt-10 text-red-500 font-bold">{err}</p>}
      {resetSuccess && (
        <p className="ml-80 mt-10 text-green-500 font-bold">
          Your Password Has Been Updated Successfully
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
