import React from "react";

const Pagination = ({ userPerPage, totalUser, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUser / userPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(currentPage);
  return (
    <div className="flex items-center justify-center mt-3 mb-4 rounded-md">
      <div className="join">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`join-item btn text-black ${
              currentPage === number ? "btn-active" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
