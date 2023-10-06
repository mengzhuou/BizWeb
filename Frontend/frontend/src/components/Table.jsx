import React from "react";

const Table = ({ clients, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const formatPhoneNumber = (phoneNumber) => {
    let strNum = String(phoneNumber);

    const country = strNum.slice(0, 1);
    const part1 = strNum.slice(1, 4);
    const part2 = strNum.slice(4, 7);
    const part3 = strNum.slice(7, 11);

    return `(+${country}) ${part1} ${part2} ${part3}`;
  };

  const formatBirthday = (birthday) => {
    let strNum = String(birthday);

    const day = strNum.slice(8, 10);
    const month = strNum.slice(5, 7);
    const year = strNum.slice(0, 4);

    return `${month}-${day}-${year}`;
  };
  return (
    <table className="table">
      <thead className="text-white text-lg">
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
          ({
            _id,
            firstName,
            lastName,
            email,
            birthday,
            phoneNumber,
          }) => (
            <tr key={_id}>
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