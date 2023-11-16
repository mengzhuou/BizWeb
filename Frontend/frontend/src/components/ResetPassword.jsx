import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import axios from "axios";

const ResetPassword = () => {
  const refOldPass = useRef(null);
  const refNewPass = useRef(null);
  const refConfirmNewPass = useRef(null);
  const currentUser = useSelector(selectCurrentUser);

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log(currentUser);
    axios("/users/resetPassword", {
      method: "PATCH",
      data: {
        username: currentUser,
        oldPassword: refOldPass.current.value,
        newPassword: refNewPass.current.value,
      },
      withCredentials: true,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-between">
      <div>
        <h1>Reset Password</h1>
        <form
          onSubmit={handleResetPassword}
          className="grid grid-cols-2 gap-10 mt-10 pl-20"
        >
          <label htmlFor="">Old Password:</label>{" "}
          <input type="text" className="h-10 rounded-md p-1" ref={refOldPass} />
          <label htmlFor="">New Password:</label>{" "}
          <input type="text" className="h-10 rounded-md p-1" ref={refNewPass} />
          <label htmlFor="">Confirm New Password:</label>{" "}
          <input
            type="text"
            className="h-10 rounded-md p-1"
            ref={refConfirmNewPass}
          />
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
  );
};

export default ResetPassword;
