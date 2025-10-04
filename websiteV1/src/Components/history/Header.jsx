import React from "react";

function Headerr({ onFilterChange, onSortChange, pageTitle }) {
  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    onFilterChange(selectedStatus);
  };

  const handleSort = (event) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-4 bg-[#4acd8d]">
      <h2 className="text-xl font-bold mb-2 sm:mb-0">{pageTitle}</h2>
      <div className="flex flex-wrap items-center space-x-2">
        {pageTitle === "Requests" && (
          <select
            className="select-dropdown bg-white border border-gray-300 rounded-md p-2 mb-2 sm:mb-0"
            onChange={handleChange}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Successful">Successful</option>
            <option value="Failed">Failed</option>
            <option value="Denied">Denied</option>
          </select>
        )}
        <select
          className="select-dropdown bg-white border border-gray-300 rounded-md p-2"
          onChange={handleSort}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Headerr;
