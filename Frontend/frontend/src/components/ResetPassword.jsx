import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const refOldPass = useRef(null);
  const refNewPass = useRef(null);
  const refConfirmNewPass = useRef(null);
  const location = useLocation();
  const [passVisibility, setPassVisibility] = useState([false, false, false]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!checkPasswordRequirement(refNewPass.current.value)) {
      return;
    }
    if (refNewPass.current.value !== refConfirmNewPass.current.value) {
      toast.error("Passwords do not match");
      return;
    }
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
        toast.success("Your Password Has Been Updated Successfully");
      })
      .catch((err) => {
        console.log("b");
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  const handleToggleVisibility = (ind) => {
    setPassVisibility((prev) =>
      prev.map((item, index) => (index === ind ? !item : item))
    );
  };

  const checkPasswordRequirement = (pass) => {
    if (pass.length < 8) {
      toast.error("Password length too short");
    } else if (!/[0-9]/.test(pass)) {
      toast.error("At least one numeric digit");
    } else if (!/[a-z]/.test(pass)) {
      toast.error("At least one lowercase letter");
    } else if (!/[A-Z]/.test(pass)) {
      toast.error("At least one uppercase letter");
    } else if (!/[^A-Za-z0-9]/.test(pass)) {
      toast.error("At least one special character");
    } else {
      return true;
    }
    return false;
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
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
