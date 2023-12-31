import {  useNavigate } from "react-router-dom";
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
    <>
        <h1 className="text-xl font-bold">Direct Project</h1>

        <div className="buttonContainer">
          <h1>Select a Project</h1>
          <select className="pageButton" value={value} onChange={handleChange}>
            <option value="Project1">Project 1</option>
            <option value="Project2">Project 2</option>
            <option value="Project3">Project 3</option>
          </select>
          <button className="pageButton" onClick={handleProject}>
            Submit
          </button>
        </div>
        </>
  );
  return content;
};
export default DirectProject;
