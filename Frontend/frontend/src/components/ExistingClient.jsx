import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "./Table";
import Pagination from "./Pagination";
import LookupClient from "./LookupClient";
import NavBar from "./NavBar";

const ExistingClient = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientPerPage] = useState(5);
  const [isUserFound, setIsUserFound] = useState(true);
  const [phone, setPhone] = useState("");
  const nameSearch = useRef(null);
  const birthdaySearch = useRef(null);

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
    if (phone.length != 0) {
      clientsMatched = clientsMatched.filter(
        (client) => client.phoneNumber === parseInt(phone)
      );
    }
    if (clientsMatched.length === 0) {
      setIsUserFound(false);
    } else {
      setIsUserFound(true);
    }
    setFilteredClients(clientsMatched);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="public">
      <header>
        <NavBar />
      </header>
      <main className="public__main">
        <div className="p-3">
          <header className="fmy-2">
            <h1 className="text-xl font-bold">Look Up Existing Client</h1>
          </header>
          <div className="flex flex-col justify-center items-center p-2">
            <LookupClient
              nameSearch={nameSearch}
              birthdaySearch={birthdaySearch}
              handleSearch={handleSearch}
              setPhone={setPhone}
              phone={phone}
            />
            <div className="my-10"></div>

            {!isUserFound ? (
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
      </main>
    </section>
  );
};

export default ExistingClient;
