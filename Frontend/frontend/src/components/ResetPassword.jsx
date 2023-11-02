import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [err, setErr] = useState(null);
  const handleReset = async (e) => {
    e.preventDefault();
    if (e.target[0].value !== e.target[1].value) {
      setErr("Password Does Not Match");
      return;
    }
    await axios.patch(`/users/resetPassword`, {
      username: sessionStorage.getItem("username"),
      password: e.target[0].value,
    });
  };
  return (
    <div>
      <form onSubmit={handleReset}>
        <label htmlFor="newPassword"></label>
        <input type="text" id="newPassword" className="p-1 m-1 rounded-md" />
        <label htmlFor="confirmNewPassword"></label>
        <input
          type="text"
          id="confirmNewPassword"
          className="p-1 m-1 rounded-md"
        />
        <button type="submit">Reset Password</button>
      </form>
      {err && <div className="text-red-600 font-bold text-lg">{err}</div>}
    </div>
  );
};

export default ResetPassword;
