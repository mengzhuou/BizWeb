import React from "react";

const LookupClient = ({
  handleSearch,
  nameSearch,
  phoneSearch,
  birthdaySearch,
}) => {
  return (
    <form onSubmit={handleSearch} className="mt-10 flex">
      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="searchInput" className="m-3 text-lg">
          Name
        </label>
        <input
          ref={nameSearch}
          id="searchInput"
          type="text"
          placeholder="First Name"
          className="text-lg rounded-md p-2 text-black focus:outline-none"
        />
        <label htmlFor="searchInput" className="m-3 text-lg">
          Birthday
        </label>
        <input
          ref={birthdaySearch}
          id="searchInput"
          type="date"
          placeholder="Birthday"
          className="text-lg rounded-md p-2 text-black focus:outline-none"
        />
        <label htmlFor="searchInput" className="m-3 text-lg">
          Phone Number
        </label>
        <input
          ref={phoneSearch}
          id="searchInput"
          type="phoneNumber"
          placeholder="Phone Number"
          className="text-lg rounded-md p-2 text-black focus:outline-none"
        />
      </div>
      <button type="submit" className="btn btn-info ml-8 my-20 font-bold">
        Look up
      </button>
    </form>
  );
};

export default LookupClient;
