import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/"className="float-right topNavBar">
        Log Out
      </Link>
      <Link to="/menu" className="float-right topNavBar">
        Menu
      </Link>
      <Link to="/managementMenu" className="float-right topNavBar">
        Management
      </Link>
    </div>
  );
}
