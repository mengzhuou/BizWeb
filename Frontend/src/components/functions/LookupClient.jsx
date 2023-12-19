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
    <form onSubmit={handleSearch} className="flex mt-10">
      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="searchName" className="m-4 text-lg">
          Name
        </label>
        <input
          ref={nameSearch}
          id="searchName"
          type="text"
          placeholder="Full Name"
          className="p-2 text-lg text-black rounded-md focus:outline-none"
        />
        <label htmlFor="searchBirthday" className="m-4 text-lg">
          Birthday
        </label>
        <input
          ref={birthdaySearch}
          id="searchBirthday"
          type="date"
          min="1900-01-01"
          max={new Date().toISOString().split("T")[0]}
          placeholder="MM/DD/YYYY"
          className="p-2 text-lg text-black rounded-md focus:outline-none"
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
          placeholder="9 (999) 999-9999"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
          className="my-2 text-lg text-black focus:outline-none"
        />
      </div>
      <button type="submit" className="my-20 ml-8 font-bold btn btn-info">
        Look up
      </button>
    </form>
  );
};

export default LookupClient;
