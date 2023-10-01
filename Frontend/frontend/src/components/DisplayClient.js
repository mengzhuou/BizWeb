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

        setFirstName(firstName);
        setLastName(lastName);
        setBirthday(birthday);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setGender(gender);
        console.log(clientId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clientId]);

  return (
    <div>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{birthday}</p>
      <p>{birthday}</p>
      <p>{phoneNumber}</p>
      <p>{email}</p>
      <p>{gender}</p>
    </div>
  );
};
export default DisplayClient;
