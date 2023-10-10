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
    // Create an object to hold the client data
    const clientData = {
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      secondaryPhoneNumber,
    };

    Axios.post("http://localhost:3500/clients", clientData)
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
        <h1>Register Client</h1>
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
                min="1900-01-01"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
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
                  height: "50px",
                }}
                inputStyle={{
                  height: "50px",
                  fontSize: "16px",
                }}
              />
            </div>
            <div>
              <label htmlFor="secondaryPhoneNumber">
                Secondary Phone Number:{" "}
              </label>
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
                  height: "50px",
                }}
                inputStyle={{
                  height: "50px",
                  fontSize: "16px",
                }}
              />
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
            <ToastContainer />
          </div>
        </div>
        </>
  );
}

export default RegisterClient;
