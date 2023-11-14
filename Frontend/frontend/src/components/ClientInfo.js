import { useParams } from "react-router-dom";
import Axios from "axios";
import React, { useState, useEffect } from "react";

const DisplayClient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { clientId } = useParams();
  const [notEditMode, setNotEditMode] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:3500/clients/${clientId}`)
      .then((response) => {
        console.log(response.data);
        const deserializer = deserialization(response.data.clientFound);
        setFirstName(deserializer.firstName);
        setLastName(deserializer.lastName);
        setBirthday(deserializer.fBirthday);
        setAddress(deserializer.address);
        setPhoneNumber(deserializer.fPrimary);
        setEmail(deserializer.email);
        setSecondaryPhoneNumber(deserializer.fSecondary);
      })
      .catch((error) => {
        console.log("SMTH WRONG");
        console.log(error);
      });
  }, [clientId]);

  const handleButtonClick = () => {
    setNotEditMode(false);
  };

  const handleConfirmClick = () => {
    // Add your logic for the 'confirm' button click here
    console.log("Confirm button clicked");
    setNotEditMode(true);
  };

  const handleCancel = () => {
    setNotEditMode(true);
  };

  return (
    <div>
      {notEditMode && <div>First name: {firstName}</div>}
      {notEditMode && <div>Last name: {lastName}</div>}
      {notEditMode && <div>Birthday: {birthday}</div>}
      {notEditMode && <div>Address: {address}</div>}
      {notEditMode && <div>Primary phone number: {phoneNumber}</div>}
      {notEditMode && (
        <div>Secondary phone number: {secondaryPhoneNumber} </div>
      )}
      {notEditMode && <div>Email: {email}</div>}
      {notEditMode && <button onClick={handleButtonClick}>Edit</button>}

      {!notEditMode && (
        <div>
          Firstname:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      )}
      {!notEditMode && (
        <div>
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      )}
      {!notEditMode && (
        <div>
          Birthday:
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e)}
            placeholder="MM/DD/YYYY"
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
            className="className= mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )}
      {!notEditMode && (
        <div>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      )}
      {/* {!notEditMode && (
        <div>
          Primary phone number: PhoneInput inputProps=
          {{
            name: "phoneNumber",
            id: "phoneNumber",
          }}
          country={"us"}
          onlyCountries={["us"]}
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          placeholder="9 (999) 999-9999" containerStyle=
          {{
            height: "30px",
            width: "fit-content",
            display: "inline-block",
          }}
          inputStyle=
          {{
            height: "30px",
            width: "fit-content",
            fontSize: "16px",
          }}
        </div>
      )} */}
      {/* {!notEditMode && (
        <div>
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e)}
            placeholder="Email"
            className="className= mb-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      )} */}
      {!notEditMode && <button onClick={handleConfirmClick}>Confirm</button>}
      {!notEditMode && <button onClick={handleCancel}>Cancel</button>}
    </div>
  );
};

const deserialization = (data) => {
  let {
    firstName,
    lastName,
    email,
    birthday,
    address,
    phoneNumber,
    secondaryPhoneNumber,
  } = data;
  const birthdayDate = new Date(birthday);
  const fBirthday = birthdayDate.toLocaleDateString();
  const fPrimary = formatPhoneNumber(phoneNumber);
  let fSecondary = "None";
  if (secondaryPhoneNumber !== undefined) {
    fSecondary = formatPhoneNumber(secondaryPhoneNumber);
  }
  const deserializedData = {
    firstName,
    lastName,
    fBirthday,
    email,
    address,
    fPrimary,
    fSecondary,
  };

  return deserializedData;
};
const formatPhoneNumber = (number) => {
  const phoneNumberArray = number.toString().split("");
  const regionCode = phoneNumberArray[0];
  const partA = phoneNumberArray.slice(1, 4).join("");
  const partB = phoneNumberArray.slice(4, 7).join("");
  const partC = phoneNumberArray.slice(6, 10).join("");
  const formattedPhoneNumber = `+${regionCode} (${partA}) ${partB}-${partC}`;
  return formattedPhoneNumber;
};
export default DisplayClient;
