import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [err, setErr] = useState(null);
  const [errToken, setErrToken] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("waekude");
  }, []);

  const handleReset = (e) => {
    e.preventDefault();
    if (e.target[0].value !== e.target[1].value) {
      setErr("Password Does Not Match");
      return;
    }

    console.log(e.target[0].value);
    axios(`/users/resetPassword`, {
      method: "PATCH",
      data: {
        username: sessionStorage.getItem("username"),
        password: e.target[0].value,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.status);
        navigate("/");
        setErr(null);
      })
      .catch((err) => setErr(err.message));
  };

  const checkCookie = () => {
    axios("/auth/verifyToken", {
      method: "POST",
      withCredentials: true,
    })
      .then((res) => {
        setErrToken(false);
        console.log("weee1");
      })
      .catch((err) => {
        console.error(err.message);
        setErrToken(true);
      });

    console.log("wae?");
  };
  return (
    <div>
      {!errToken && (
        <form onSubmit={handleReset}>
          <label htmlFor="newPassword"></label>
          <input type="text" id="newPassword" className="p-1 m-1 rounded-md" />
          <label htmlFor="confirmNewPassword"></label>
          <input
            type="text"
            id="confirmNewPassword"
            className="p-1 m-1 rounded-md focus:outline-none"
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
      {err && <div className="text-red-600 font-bold text-lg">{err}</div>}
      <button onClick={checkCookie}>Click me</button>
    </div>
  );
};

export default ResetPassword;
