import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div class="border-solid border-sky-500">
      <Link to="/menu" className="topNavBar">
        Menu
      </Link>
      <Link to="/" className="topNavBar">
        Management
      </Link>
      <Link to="/" class="float-right" className="topNavBar float-right">
        Log Out
      </Link>
    </div>
  );
}
