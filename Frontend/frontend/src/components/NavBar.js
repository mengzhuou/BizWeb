import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({updateCookie}) {
  return (
    <div>
      <Link to="/" onClick={() => updateCookie('null')}className="topNavBar float-right">
        Log Out
      </Link>
      <Link to="/" className="topNavBar float-right">
        Menu
      </Link>
      <Link to="/" className="topNavBar float-right">
        Management
      </Link>
    </div>
  );
}
