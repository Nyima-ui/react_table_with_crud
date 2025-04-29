import React, { useEffect, useState } from "react";

const Table = ({
  totalPages,
  currentPage,
  currentPageData,
  setCurrentPage,
  tableData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = tableData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase() || 
    item.gender.toLowerCase().includes(searchTerm.toLowerCase() || 
    item.age.includes(searchTerm)))
  );

  const dataToDisplay = searchTerm ? filteredData : currentPageData;

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="border m-5 bg-white"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="border mx-5 mt-2 bg-white">
        {/* heading row  */}
        <thead>
          <tr className="border">
            <th className="border px-6">Name</th>
            <th className="border px-6">Gender</th>
            <th className="border px-6">Age</th>
            <th className="border px-6">Action</th>
          </tr>
        </thead>
        {/* table rows  */}
        <tbody>
          {dataToDisplay.map((data, index) => (
            <tr key={index}>
              <td className="border px-6 py-1">{data.name}</td>
              <td className="border px-6">{data.gender}</td>
              <td className="border px-6">{data.age}</td>
              <td className="border px-6">
                <button className="border bg-red-500 mx-2 text-white px-2 cursor-pointer">
                  Edit
                </button>
                <button className="border bg-green-500 mx-2 text-white px-2 cursor-pointer">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pl-30 mt-3">
        {Array.from({ length: totalPages }, (_, index) => {
          const isActive = currentPage === index + 1;
          return (
            <button
              className={`px-4 py-1 rounded-md mt-3 cursor-pointer mx-3
              ${isActive ? "bg-green-500 text-white" : "bg-white text-black"}`}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Table;
