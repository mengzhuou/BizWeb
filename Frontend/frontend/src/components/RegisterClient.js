import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderDropdown from "./GenderDropdown";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Axios from "axios";
import Navbar from "./NavBar";

function RegisterClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [emailError, setEmailError] = useState("");
  const [presenceError, setPresenceError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }

    if (id === "lastName") {
      setLastName(value);
    }

    if (id === "email") {
      // Email format validation
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailPattern.test(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmail(value);
        setEmailError("");
      }
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

    if (emailError) {
      setPresenceError("Email format is invalid");
      return;
    } else if (!firstName.trim()) {
      setPresenceError("First name cannot be blank.");
      return;
    } else if (!lastName.trim()) {
      setPresenceError("Last name cannot be blank.");
      return;
    } else if (!birthday.trim()) {
      setPresenceError("Birthday cannot be blank.");
      return;
    } else if (!phoneNumber.trim()) {
      setPresenceError("Phone number cannot be blank.");
      return;
    } else if (!gender.trim()) {
      setPresenceError("Gender cannot be blank");
      return;
    } else {
      setPresenceError("");
    }

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
        if (error.response === undefined) {
          console.error("Server is not running");
        }
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
        <Navbar />
      </header>
      <main className="public__main">
        <h1>Register Client</h1>
        <div className="text-black">
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
          <p style={{ color: "red" }}>{presenceError}</p>{" "}
          {/* Display error message */}
        </div>
      </main>
    </section>
  );
}

export default RegisterClient;
