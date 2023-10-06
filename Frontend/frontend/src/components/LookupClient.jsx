import React from "react";
import PhoneInput from "react-phone-input-2";

const LookupClient = ({
  handleSearch,
  nameSearch,
  birthdaySearch,
  setPhone,
  phone,
}) => {
  return (
    <form onSubmit={handleSearch} className="mt-10 flex">
      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="searchName" className="m-4 text-lg">
          Name
        </label>
        <input
          ref={nameSearch}
          id="searchName"
          type="text"
          placeholder="Full Name"
          className="text-lg rounded-md p-2 text-black focus:outline-none"
        />
        <label htmlFor="searchBirthday" className="m-4 text-lg">
          Birthday
        </label>
        <input
          ref={birthdaySearch}
          id="searchBirthday"
          type="date"
          placeholder="MM/DD/YYYY"
          className="text-lg rounded-md p-2 text-black focus:outline-none"
        />
        <label htmlFor="searchPhone" className="m-4 text-lg">
          Phone Number
        </label>
        <PhoneInput
          inputProps={{
            id: "searchPhone",
          }}
          containerStyle={{
            height: "50px",
          }}
          inputStyle={{
            height: "50px",
            fontSize: "16px",
          }}
          country={"us"}
          value={phone}
          onChange={(inp) => setPhone(inp)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSearch(e);
            }
          }}
          className="text-lg my-2 text-black focus:outline-none"
        />
      </div>
      <button type="submit" className="btn btn-info ml-8 my-20 font-bold">
        Look up
      </button>
    </form>
  );
};

export default LookupClient;
