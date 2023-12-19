import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "../components/EmployeeTable";
import Pagination from "../components/Pagination";

const ExistingEmployee = () => {
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientPerPage] = useState(5);
  const [err, setErr] = useState(null);

  const config = {
    withCredentials: true, // includes cookies
  };

  useEffect(() => {
    axios
      .get("/users", config)
      .then((res) => {
        setFilteredClients(res.data);
        setLoading(false);
        setErr(null);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.response.data);
      });
  }, []);

  const indexOfLastClient = currentPage * clientPerPage;
  const indexOfFirstClient = indexOfLastClient - clientPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-3">
      <header className="fmy-2">
        <h1 className="text-xl font-bold">Look Up Existing Employee</h1>
      </header>
      <div className="flex flex-col justify-center items-center p-2">
        <div className="my-10"></div>

        {!filteredClients ? (
          <h1 className="text-red-500 text-xl">Users Not Found</h1>
        ) : (
          <>
            <EmployeeTable
              clients={currentClients}
              loading={loading}
              err={err}
              setErr={setErr}
              setFilteredClients={setFilteredClients}
            />
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

export default ExistingEmployee;
