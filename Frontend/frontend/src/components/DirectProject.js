import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";


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
        <h1>Direct Project</h1>
      </header>
      <main className="public__main">
        <p>Select a Project</p>
        <select value={value} onChange={handleChange}>
          <option value="Project1">Project 1</option>
          <option value="Project2">Project 2</option>
          <option value="Project3">Project 3</option>
        </select>
        <button onClick={handleProject}>Submit</button>
      </main>
      <footer>
        <Link to="/">Welcome</Link>
      </footer>
    </section>
  );
  return content;
};
export default DirectProject;

