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
        const {
          firstName,
          lastName,
          birthday,
          phoneNumber,
          email,
          secondaryPhoneNumber,
        } = response.data.clientFound;
        const type = typeof birthday;
        console.log(type);
        setFirstName(firstName);
        setLastName(lastName);
        setBirthday(birthday);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setSecondaryPhoneNumber(secondaryPhoneNumber);
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
export default DisplayClient;
