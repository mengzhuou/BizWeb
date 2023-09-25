import { Link } from "react-router-dom";

// const Register = () => {
//   const content = (
//     <section className="public">
//       <header>
//         <h1>Register</h1>
//       </header>
//       <main className="public__main">
//         <p>Register function</p>
//       </main>
//       <footer>
//         <Link to="/">Welcome</Link>
//       </footer>
//     </section>
//   );
//   return content;
// };
// export default Register;

import React, { useState, setState } from "react";

function Register() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <section className="public">
      <header>
        <h1>Register</h1>
      </header>
      <main className="public__main">
        <div>
          <div>
            <div>
              <label for="firstName">First Name </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => handleInputChange(e)}
                id="firstName"
                placeholder="First Name"
              />
            </div>
            <div>
              <label for="lastName">Last Name </label>
              <input
                type="text"
                name=""
                id="lastName"
                value={lastName}
                onChange={(e) => handleInputChange(e)}
                placeholder="LastName"
              />
            </div>
            <div>
              <label for="email">Email </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e)}
                placeholder="Email"
              />
            </div>
            <div>
              <label for="password">Password </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
                placeholder="Password"
              />
            </div>
            <div>
              <label for="confirmPassword">Confirm Password </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e)}
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div>
            <button onClick={() => handleSubmit()} type="submit" class="btn">
              Register
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Link to="/">Welcome</Link>
      </footer>
    </section>
  );
}

export default Register;
