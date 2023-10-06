import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const ExistingClient = () => {
  const content = (
    <section className="public">
      <header>
        <NavBar />
      </header>
    </section>
  );
  return content;
};
export default ExistingClient;
