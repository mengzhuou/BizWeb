import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterClient() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("");
  const navigate = useNavigate();
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
      setEmail(value);
    }
    if (id === "birthday") {
      setBirthday(value);
    }
    if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
    if (id === "secondaryPhoneNumber") {
      setSecondaryPhoneNumber(value);
    }
  };

  const handleSubmit = () => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!firstName.trim()) {
      setPresenceError("First name cannot be blank.");
      return;
    } else if (!lastName.trim()) {
      setPresenceError("Last name cannot be blank.");
      return;
    } else if (!emailPattern.test(email)) {
      setPresenceError("Invalid email format");
      return;
    } else if (!birthday.trim()) {
      setPresenceError("Birthday cannot be blank.");
      return;
    } else if (!phoneNumber.trim()) {
      setPresenceError("Phone number cannot be blank.");
      return;
    } else if (phoneNumber.length !== 10) {
      setPresenceError("Phone number invalid");
      return;
    } else {
      setPresenceError("");
    }
    if (!secondaryPhoneNumber.trim() || secondaryPhoneNumber.length !== 10) {
      setSecondaryPhoneNumber("");
    }
    const clientData = {
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      secondaryPhoneNumber,
    };

    Axios.post("/clients", clientData)
      .then((response) => {
        toast.success("Successfully added to the database");
        console.log("Successfully added to the database");
        const newClientId = response.data._id;
        navigate(`/displayClient/${newClientId}`);
      })
      .catch((error) => {
        let errorMessage = error.response.data.message;

        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = error.response.data.message;
              break;
            case 409:
              errorMessage = error.response.data.message;
              break;
            default:
              errorMessage = "Unhandled error status: " + error.response.status;
          }
          toast.error(errorMessage);
        } else {
          toast.error("Network error or other issues");
        }
      });
  };

  return (
    <>
      <header className="fmy-2">
        <h1 className="text-xl font-bold">Register Client</h1>
      </header>
      <div className="flex flex-col items-center justify-center p-2">
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First name"
            className="className= mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="className= mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="ml-9">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
            className="className= mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mr-20">
          <label htmlFor="birthday">Date Of Birth: </label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => handleInputChange(e)}
            placeholder="MM/DD/YYYY"
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
            className="className= mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mr-7">
          <label htmlFor="phoneNumber">Primary Phone Number: </label>
          <PhoneInput
            inputProps={{
              name: "phoneNumber",
              id: "phoneNumber",
            }}
            country={"us"}
            onlyCountries={["us"]}
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            placeholder="9 (999) 999-9999"
            containerStyle={{
              height: "30px",
              width: "fit-content",
              display: "inline-block",
            }}
            inputStyle={{
              height: "30px",
              width: "fit-content",
              fontSize: "16px",
            }}
          />
        </div>
        <div className="mt-3 mr-12">
          <label htmlFor="secondaryPhoneNumber">Secondary Phone Number: </label>
          <PhoneInput
            inputProps={{
              name: "secondaryPhoneNumber",
              id: "secondaryPhoneNumber",
            }}
            country={"us"}
            onlyCountries={["us"]}
            value={secondaryPhoneNumber}
            onChange={(value) => setSecondaryPhoneNumber(value)}
            placeholder="9 (999) 999-9999"
            containerStyle={{
              height: "30px",
              width: "fit-content",
              display: "inline-block",
            }}
            inputStyle={{
              width: "fit-content",
              height: "30px",
              fontSize: "16px",
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          type="submit"
          className="mt-3 ml-72 btn"
        >
          Register
        </button>
        <ToastContainer />
      </div>
      <p className="mt-5 flex justify-center" style={{ color: "red" }}>
        {presenceError}
      </p>{" "}
    </>
  );
}

export default RegisterClient;
