import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table";
import Pagination from "./Pagination";
import LookupClient from "./LookupClient";

const ExistingClient = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientPerPage] = useState(5);
  const [validInput, setValidInput] = useState(true);
  const [isUserFound, setIsUserFound] = useState(true);
  const nameSearch = useRef(null);
  const birthdaySearch = useRef(null);
  const phoneSearch = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3500/clients").then((res) => {
      setClients(res.data);
      setLoading(false);
    });
  }, []);

  const indexOfLastClient = currentPage * clientPerPage;
  const indexOfFirstClient = indexOfLastClient - clientPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (
      !nameSearch.current.value &&
      !phoneSearch.current.value &&
      !birthdaySearch.current.value
    ) {
      setValidInput(false);
      return;
    }
    let clientsMatched = clients;
    if (nameSearch.current.value) {
      clientsMatched = clientsMatched.filter(
        (client) =>
          client.firstName + " " + client.lastName === nameSearch.current.value
      );
    }
    if (birthdaySearch.current.value) {
      clientsMatched = clientsMatched.filter(
        (client) =>
          client.birthday.slice(0, 10) === birthdaySearch.current.value
      );
    }
    if (phoneSearch.current.value) {
      clientsMatched = clientsMatched.filter(
        (client) => client.phoneNumber === parseInt(phoneSearch.current.value)
      );
    }
    if (clientsMatched.length === 0) {
      setIsUserFound(false);
    } else {
      setIsUserFound(true);
    }
    setFilteredClients(clientsMatched);
    setValidInput(true);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-3">
      <header>
        <Link to="/" className="topNavBar">
          Log Out
        </Link>
      </header>
      <header className="my-2">
        <h1 className="text-xl">Look Up Existing Client</h1>
      </header>
      <div className="flex flex-col justify-center items-center p-2">
        <LookupClient
          nameSearch={nameSearch}
          birthdaySearch={birthdaySearch}
          phoneSearch={phoneSearch}
          handleSearch={handleSearch}
        />
        <div className="my-10"></div>

        {!validInput ? (
          <h2>'Please fill out one of the input field'</h2>
        ) : !isUserFound ? (
          <h1 className="text-red-500 text-xl">User Not Found</h1>
        ) : (
          <>
            <Table clients={currentClients} loading={loading} />
            <Pagination
              currentPage={currentPage}
              userPerPage={clientPerPage}
              totalUser={filteredClients.length}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ExistingClient;
