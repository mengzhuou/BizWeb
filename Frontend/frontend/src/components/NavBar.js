import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div class="border-solid border-color-500">
      <Link to="/" class="float-right" className="topNavBar float-right">
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
