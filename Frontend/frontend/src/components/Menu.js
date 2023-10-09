import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import NavBar from "./NavBar";

const Menu = () => {
  const navigate = useNavigate();
  const handleRegisterClient = () => {
    navigate("/registerClient");
  };

  const handleExistingClient = () => {
    navigate("/existingClient");
  };

  const handleDirectProject = () => {
    navigate("/directProject");
  };

  const content = (
    
      <main className="public__main">
        <div className="menuButtonContainer">
          <button className="menuButton" onClick={handleRegisterClient}>
            Register a New Client
          </button>
          <button className="menuButton" onClick={handleExistingClient}>
            Look Up an Existing Client
          </button>
          <button className="menuButton" onClick={handleDirectProject}>
            Direct Project
          </button>
        </div>
      </main>

  );
  return content;
};
export default Menu;
