import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({update}) {
  const navigate = useNavigate();
  return (
    <div>
      <button to="/" onClick={() => {
        update('null')
        navigate("/");

      }} className="topNavBar float-right">
        Log Out
      </button>
      <Link to="/" className="topNavBar float-right">
        Menu
      </Link>
      <Link to="/" className="topNavBar float-right">
        Management
      </Link>
    </div>
  );
}
