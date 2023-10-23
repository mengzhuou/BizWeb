import { useParams } from "react-router-dom";
import Axios from "axios";
import React, { useState, useEffect } from "react";

const DisplayClient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { clientId } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3500/clients/${clientId}`)
      .then((response) => {
        console.log(response.data);
        const deserializer = deserialization(response.data.clientFound);
        setFirstName(deserializer.firstName);
        setLastName(deserializer.lastName);
        setBirthday(deserializer.fBirthday);
        setPhoneNumber(deserializer.fPrimary);
        setEmail(deserializer.email);
        setSecondaryPhoneNumber(deserializer.fSecondary);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clientId]);

  return (
    <div>
      <div>First name: {firstName}</div>
      <div>Last name: {lastName}</div>
      <div>Birthday: {birthday}</div>
      <div>Primary phone number: {phoneNumber}</div>
      <div>Secondary phone number: {secondaryPhoneNumber} </div>
      <div>Email: {email}</div>
    </div>
  );
};

const deserialization = (data) => {
  let {
    firstName,
    lastName,
    birthday,
    phoneNumber,
    secondaryPhoneNumber,
    email,
  } = data;
  const birthdayDate = new Date(birthday);
  const fBirthday = birthdayDate.toLocaleDateString();
  const fPrimary = formatPhoneNumber(phoneNumber);
  let fSecondary = "None";
  if (secondaryPhoneNumber !== null) {
    fSecondary = formatPhoneNumber(secondaryPhoneNumber);
  }
  const deserializedData = {
    firstName,
    lastName,
    fBirthday,
    fPrimary,
    fSecondary,
    email,
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
