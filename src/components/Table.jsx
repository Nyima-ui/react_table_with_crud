import React, { useEffect, useMemo, useState, useRef } from "react";

const Table = ({
  totalPages,
  currentPage,
  currentPageData,
  setCurrentPage,
  tableData,
  setTableData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const tableRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    const search = debouncedSearchTerm.toLowerCase();
    const regex = new RegExp(`\\b${search}`, "i");
    return tableData.filter((item) => {
      return Object.values(item).some((val) => regex.test(val.toString()));
    });
  }, [tableData, debouncedSearchTerm]);

  const dataToDisplay = searchTerm ? filteredData : currentPageData;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editingIndex !== null &&
        tableRef.current &&
        !tableRef.current.contains(event.target)
      ) {
        const actualIndex = tableData.findIndex((item) => {
          return (
            item.name === dataToDisplay[editingIndex].name &&
            item.gender === dataToDisplay[editingIndex].gender &&
            item.age === dataToDisplay[editingIndex].age
          );
        });
        setEditingIndex(null);
        if (actualIndex !== -1) {
          const updatedData = [...tableData];
          updatedData[actualIndex] = editedData;
          setTableData(updatedData);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingIndex, editedData, tableData, setTableData, dataToDisplay]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const editData = (index) => {
    setEditingIndex(index);
    setEditedData({ ...dataToDisplay[index] });
  };

  const deleteRow = (index) => {
    const dataIndex = tableData.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(dataToDisplay[index])
    );
    if (dataIndex === -1) return;
    const newData = tableData.filter((_, i) => i !== dataIndex);
    const itemsPerPage = 5; // Or pass this as a prop
    const wasLastItemOnPage = newData.length % itemsPerPage === 0;
    setTableData(newData);
    if (wasLastItemOnPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleFieldChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="border m-5 bg-white"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="border mx-5 mt-2 bg-white" ref={tableRef}>
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
        <tbody className="max-w-md">
          {dataToDisplay.map((data, index) => (
            <tr
              key={index}
              className={editingIndex === index ? "bg-gray-300" : ""}
            >
              <td className="border py-1 px-2">
                {editingIndex === index ? (
                  <input
                    className="max-w-[75px] focus:outline-none"
                    type="text"
                    value={editedData.name || ""}
                    ref={inputRef}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                  />
                ) : (
                  data.name
                )}
              </td>
              <td className="border px-6">
                {editingIndex === index ? (
                  <input
                    className="max-w-[50px] focus:outline-none"
                    type="text"
                    value={editedData.gender || ""}
                    onChange={(e) =>
                      handleFieldChange("gender", e.target.value)
                    }
                  />
                ) : (
                  data.gender
                )}
              </td>
              <td className="border px-6">
                {editingIndex === index ? (
                  <input
                    className="max-w-[26px] focus:outline-none"
                    type="number"
                    value={editedData.age || ""}
                    onChange={(e) => handleFieldChange("age", e.target.value)}
                  />
                ) : (
                  data.age
                )}
              </td>
              <td className="border px-6">
                <button
                  className="border bg-red-500 mx-2 text-white px-2 cursor-pointer"
                  onClick={() => editData(index)}
                >
                  Edit
                </button>
                <button
                  className="border bg-green-500 mx-2 text-white px-2 cursor-pointer"
                  onClick={() => deleteRow(index)}
                >
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
