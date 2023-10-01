import { Link, useNavigate } from "react-router-dom";
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
    <section className="public">
      <header>
        <Link to="/" className="topNavBar">
          Log Out
        </Link>
      </header>
      <main className="public__main">
        <h1>Menu</h1>
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
    </section>
  );
  return content;
};
export default Menu;
