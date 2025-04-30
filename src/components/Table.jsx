import React, { useEffect, useMemo, useState, useRef } from "react";

const Table = ({
  totalPages,
  currentPage,
  currentPageData,
  setCurrentPage,
  tableData,
  setTableData
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editedData, setEditedData] = useState({}); 
  const tableRef = useRef(null); 

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = useMemo(() => {
    const search = debouncedSearchTerm.toLowerCase();
    const regex = new RegExp(`\\b${search}`, "i");
    return tableData.filter((item) => {
      return Object.values(item).some((val) => regex.test(val.toString()));
    });
  }, [tableData, debouncedSearchTerm]);

  const dataToDisplay = searchTerm ? filteredData : currentPageData;
   

  const editData = (index) => {
      setEditingIndex(index); 
      setEditedData({...dataToDisplay[index]}); 
  }

  useEffect(() => {
      console.log(editingIndex); 
      console.log(editedData); 
  }, [editingIndex, editedData])

  const handleFieldChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field] : value
    })); 
  }
  
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
              <td className="border px-6 py-1">
                 {editingIndex === index ? (
                   <input 
                    className="max-w-[52px] border"
                    type="text"
                    value={editedData.name || ""}
                    onChange={(e) => handleFieldChange("name", e.target.value)}/>
                 ) : (data.name)}
              </td>
              <td className="border px-6">{data.gender}</td>
              <td className="border px-6">{data.age}</td>
              <td className="border px-6">
                <button className="border bg-red-500 mx-2 text-white px-2 cursor-pointer"
                        onClick={() => editData(index)}>
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

      {!searchTerm && (
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
      )}
    </>
  );
};

export default Table;
