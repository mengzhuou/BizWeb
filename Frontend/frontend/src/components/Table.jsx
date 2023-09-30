import React from 'react'

const Table = ({clients, loading}) => {
    if (loading) {
        return <h2>Loading...</h2>
    }
    const formatPhoneNumber = (phoneNumber) => {
        let strNum = String(phoneNumber);

        const country = strNum.slice(0, 1);
        const part1 = strNum.slice(1, 4);
        const part2 = strNum.slice(4, 7);
        const part3 = strNum.slice(7, 11);

        return `(+${country}) ${part1} ${part2} ${part3}`;
    }
  return (

      <table className="table">
        <thead className="text-white text-lg">
          <tr>
            <th></th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Birth Date</th>
            <th>Phone Number</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody className='text-lg'>
          {clients.map(({ _id, firstName, lastName, email, birthday, phoneNumber, gender }) => (
            <tr key={_id} >
              <td>{_id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{birthday.slice(0,10)}</td>
              <td>{formatPhoneNumber(phoneNumber)}</td>
              <td>{gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Table