import React from "react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center space-x-2 gap-4 mt-4">
      <div className="rounded-lg border border-sky-600 p-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className="bg-sky-500 text-white py-1 px-6 rounded shadow hover:bg-sky-700 transition ml-1 mr-1"
              hidden={pageNumber === currentPage}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
