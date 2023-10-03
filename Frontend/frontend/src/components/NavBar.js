import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <a href="/" class="">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          BizWeb
        </span>
      </a>
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
