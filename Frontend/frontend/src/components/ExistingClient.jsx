import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from "./Table";
import Pagination from "./Pagination";
import LookupClient from "./LookupClient";

const ExistingClient = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientPerPage] = useState(5);
  const nameSearch = useRef(null);
  const birthdaySearch = useRef(null);
  const phoneSearch = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3500/clients").then((res) => {
      setClients(res.data);
      setFilteredClients(res.data);
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
    let clientsMatched = clients;
    if (nameSearch.current.value) {
      clientsMatched = clientsMatched.filter(
        (client) => client.firstName === nameSearch.current.value
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
    nameSearch.current.value = "";
    birthdaySearch.current.value = "";
    phoneSearch.current.value = "";
    setFilteredClients(clientsMatched);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-3">
      <div className="flex flex-col justify-center items-center p-2">
        <LookupClient
          nameSearch={nameSearch}
          birthdaySearch={birthdaySearch}
          phoneSearch={phoneSearch}
          handleSearch={handleSearch}
        />
        <div className="my-10"></div>
        <Table clients={currentClients} loading={loading} />
        <Pagination
          currentPage={currentPage}
          userPerPage={clientPerPage}
          totalUser={filteredClients.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ExistingClient;
