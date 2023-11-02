import React from "react";

const EmployeeTable = ({ clients, loading, err }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (err) {
    console.log(err);
    return <h2>{err}</h2>;
  }

  return (
    <table className="table">
      <thead className="text-lg text-white">
        <tr>
          <th>Username</th>
          <th>Roles</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody className="text-lg">
        {clients.map(({ _id, username, active, roles }) => (
          <tr key={_id}>
            <td>{username}</td>
            <td>{roles.toString()}</td>
            <td>{active.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
