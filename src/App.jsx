import { useState } from "react";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const ROWS_PER_TABLE = 5;
  const totalPages = Math.ceil(tableData.length / ROWS_PER_TABLE);

  const currentPageData = tableData.slice(
    (currentPage - 1) * ROWS_PER_TABLE,
    currentPage * ROWS_PER_TABLE
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.gender || !formData.age) return;
    setTableData((prev) => [...prev, formData]);
    setFormData({ name: "", gender: "", age: "" });
    setCurrentPage(Math.ceil((tableData.length + 1) / ROWS_PER_TABLE));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="border m-5 bg-white"
          onChange={handleChange}
          name="name"
          value={formData.name}
          required
        />
        <input
          type="text"
          placeholder="Gender"
          className="border m-5 bg-white"
          onChange={handleChange}
          name="gender"
          value={formData.gender}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="border m-5 bg-white"
          onChange={handleChange}
          name="age"
          value={formData.age}
          required
        />
        <button
          className="bg-indigo-600 text-white px-4 py-1 rounded-md block ml-50 cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </form>

      <input type="text" placeholder="Search" className="border m-5 bg-white" />

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
        {/* second row  */}
        <tbody>
          {currentPageData.map((data, index) => (
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
}

export default App;
