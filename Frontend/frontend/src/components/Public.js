import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Bizweb</span>
        </h1>
        <div>
          <Link to="/register">Client Register</Link>
        </div>
      </header>
      <main className="public__main">
        <p>TBD</p>
      </main>
      <footer>
        <div>
          <Link to="/login">Employee Login</Link>
        </div>
      </footer>
    </section>
  );
  return content;
};
export default Public;
