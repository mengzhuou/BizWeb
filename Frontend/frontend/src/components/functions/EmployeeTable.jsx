import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({ clients, loading, err }) => {
  const [isReset, setIsReset] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(clients.length);
    setIsReset(Array(clients.length).fill(false));
  }, [clients.length]);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (err) {
    console.log(err);
    return <h2>{err}</h2>;
  }

  const formatRole = (roles) => {
    if (roles.includes("manager")) {
      return "manager";
    }
    return "employee";
  };

  const handleDeleteEmployee = () => {};

  return (
    <table className="table">
      <thead className="text-lg text-white">
        <tr>
          <th>Roles</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className="text-lg">
        {clients.map(({ _id, username, firstName, lastName, roles }, index) => (
          <tr key={_id}>
            <td>{formatRole(roles)}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{username}</td>
            <td>
              <button
                className="bg-blue-400 rounded-md p-2 font-bold"
                onClick={() => navigate("resetPassword")}
              >
                Reset Password
              </button>
            </td>
            <td>
              <button
                className="bg-red-400 rounded-md p-2 font-bold"
                onClick={() => handleDeleteEmployee(_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
