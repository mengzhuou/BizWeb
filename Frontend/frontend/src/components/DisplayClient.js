import { useParams } from "react-router-dom";
import Axios from "axios";
import React, { useState, useEffect } from "react";

const DisplayClient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [clientId, setClientId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const { clientId } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:3500/clients/${clientId}`)
      .then((response) => {
        console.log(response.data);
        const { firstName, lastName, birthday, phoneNumber, email, gender } =
          response.data.clientFound;
        const type = typeof birthday;

        console.log(type);

        setFirstName(firstName);
        setLastName(lastName);
        setBirthday(birthday);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setGender(gender);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clientId]);

  return (
    <div>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>Birthday: {birthday}</div>
      <div>Phonenumber: {phoneNumber}</div>
      <div>Email: {email}</div>
    </div>
  );
};
export default DisplayClient;
