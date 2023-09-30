import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderDropdown from "./GenderDropdown";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Axios from "axios";

function RegisterClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

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
    if (id === "birthday") {
      setBirthday(value);
    }
    if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
    if (id === "gender") {
      setGender(value);
    }
  };

  const handleSubmit = () => {
    // Create an object to hold the client data
    const clientData = {
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      gender,
    };

    Axios.post("http://localhost:3500/clients", clientData)
      .then((response) => {
        console.log("Client created successfully", response.data);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          if (error.response.data.message === "All fields are required") {
            console.log(error.response.data.message);
          }
        }
        // If the server responded with an error, check the status code
        if (error.response.status === 409) {
          // Check the error response data for specific messages
          if (
            error.response.data.message === "Email has already been registered."
          ) {
            console.log(error.response.data.message);
          } else if (
            error.response.data.message ===
            "Phone number has already been registered."
          ) {
            console.log(error.response.data.message);
          } else {
            console.error("Error creating client", error);
          }
        } else {
          console.error("Network error or other issues", error);
        }
      });
  };

  return (
    <section className="public">
      <header>
        <h1>Register Client</h1>
      </header>
      <main className="public__main">
        <div>
          <div>
            <div>
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => handleInputChange(e)}
                id="firstName"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => handleInputChange(e)}
                placeholder="Last name"
              />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e)}
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="birthday">Date Of Birth: </label>
              <input
                type="date"
                id="birthday"
                value={birthday}
                onChange={(e) => handleInputChange(e)}
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number: </label>
              <PhoneInput
                inputProps={{
                  name: "phoneNumber",
                  id: "phoneNumber",
                }}
                country={"us"}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
              />
            </div>
            <div>
              <label htmlFor="gender">Select Gender: </label>
              <GenderDropdown setGender={setGender} gender={gender} />
            </div>
          </div>
          <div>
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="btn"
            >
              Register
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Link to="/" className="menuFooter">
          Log Out
        </Link>
      </footer>
    </section>
  );
}

export default RegisterClient;
