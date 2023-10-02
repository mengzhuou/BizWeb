import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Menu.css";



const DirectProject = () => {

  const getInitialState = () => {
    const value = "Project1";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };


  const navigate = useNavigate();
  const handleProject = () => {
    navigate("/directProject/" + value);
  };
  const content = (
    <section className="public">
      <header>
        <Link to="/" className="topNavBar">
          Log Out
        </Link>      
      </header>
      <main className="public__main">
        <h1>Direct Project</h1>
        <div className="menuButtonContainer">
          <h1>Select a Project</h1>
          <select className="menuButton" value={value} onChange={handleChange}>
            <option value="Project1">Project 1</option>
            <option value="Project2">Project 2</option>
            <option value="Project3">Project 3</option>
          </select>
          <button className="menuButton" onClick={handleProject}>
            Submit
          </button>
        </div>
      </main>
      <footer>
        <Link to="/">Welcome</Link>
      </footer>
    </section>
  );
  return content;
};
export default DirectProject;

