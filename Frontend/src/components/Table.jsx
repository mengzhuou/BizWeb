import { React } from "react";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber, formatBirthday } from "../utils/stringFormat";

const Table = ({ clients, loading, err }) => {
  const navigate = useNavigate();

  const handleClient = (id) => {
    navigate("/displayClient/" + id);
  };

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
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Birth Date</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody className="text-lg">
        {clients.map(
          ({ _id, firstName, lastName, email, birthday, phoneNumber }) => (
            <tr
              className="cursor-pointer"
              key={_id}
              onClick={() => handleClient(_id)}
            >
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{formatBirthday(birthday)}</td>
              <td>{formatPhoneNumber(phoneNumber)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
