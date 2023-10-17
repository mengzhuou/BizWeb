import { useNavigate } from "react-router-dom";
import "./Menu.css";

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
    <>
      <h1 className="text-xl font-bold">Menu</h1>
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
    </>
  );
  return content;
};
export default Menu;
